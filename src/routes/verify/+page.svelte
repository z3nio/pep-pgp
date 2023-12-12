<script lang="ts">
	import {writable} from "svelte/store";
	import {formatPgpBlock} from "$lib";
	import Spinner from "$lib/components/Spinner.svelte";
	import {delay} from "$lib";
	import * as openpgp from "openpgp";
	import type {ModalSettings} from "@skeletonlabs/skeleton";
	import {getModalStore} from "@skeletonlabs/skeleton";

	let loading = writable(false);

	let signerspublickey: string;
	let signedmessage: string;

	let isVerified: boolean;

	const modalStore = getModalStore();

	async function onSubmit() {
		$loading = true;
		await delay(100);

		try {
			const publicKey = await openpgp.readKey({armoredKey: formatPgpBlock(signerspublickey)});
			const message = await openpgp.readCleartextMessage({cleartextMessage: signedmessage.trim()});
			const {signatures} = await openpgp.verify({
				message: message,
				verificationKeys: publicKey,
			});
			if (signatures.length > 0) {
				isVerified = true;
			}
		} catch (e) {
			console.log(e);
			isVerified = false;
		}

		const modal: ModalSettings = {
			type: "component",
			component: "VerifyMessageModal",
			title: "Verified Message Status",
			body: "This is the status of the signed message.",
			meta: {
				isVerified: isVerified,
			},
		};
		modalStore.trigger(modal);
		signerspublickey = "";
		signedmessage = "";
		$loading = false;
	}
</script>

<form class="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 text-sm" on:submit|preventDefault={onSubmit}>
	<div class="flex flex-col gap-1">
		<label class="label">
			<span class="text-xs">Signer's Public Key</span>
			<textarea
				bind:value={signerspublickey}
				required
				class="textarea bg-primary-100 text-sm h-48"
				rows="4"
				placeholder="Paste Signer's Public Key..."
			/>
		</label>
	</div>
	<div class="flex flex-col gap-1">
		<label class="label">
			<span class="text-xs">Signed Message</span>
			<textarea
				bind:value={signedmessage}
				required
				class="textarea bg-primary-100 text-sm h-48"
				rows="4"
				placeholder="Paste Signed Message..."
			/>
		</label>
	</div>
	<button type="submit" class="btn-sm btn variant-filled my-2">
		{#if $loading === true}
			<Spinner />
		{:else}
			Verify Signed Message
		{/if}
	</button>
</form>
