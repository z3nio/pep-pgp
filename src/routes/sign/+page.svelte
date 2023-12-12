<script lang="ts">
	import {delay, formatPgpBlock} from "$lib";
	import Spinner from "$lib/components/Spinner.svelte";
	import {writable} from "svelte/store";
	import * as openpgp from "openpgp";
	import {getModalStore} from "@skeletonlabs/skeleton";
	import type {ModalSettings} from "@skeletonlabs/skeleton";

	let loading = writable(false);

	let signersprivatekey: string;
	let message: string;
	let passphrase: string;
	let hasError: boolean;
	let generatedMessage: string;

	const modalStore = getModalStore();

	async function onSubmit() {
		$loading = true;
		await delay(100);

		try {
			const privateKey = await openpgp.decryptKey({
				privateKey: await openpgp.readPrivateKey({armoredKey: formatPgpBlock(signersprivatekey)}),
				passphrase: passphrase,
			});
			const cleartext = await openpgp.createCleartextMessage({text: message});
			const signedMessage = await openpgp.sign({
				message: cleartext,
				signingKeys: privateKey,
			});
			hasError = false;
			generatedMessage = signedMessage;
		} catch (e) {
			console.log(e);
			hasError = true;
		}

		const modal: ModalSettings = {
			type: "component",
			component: "SignMessageModal",
			title: "Generated PGP Key",
			body: "This is your signed message. This information can be shared with others so that they can verify the signed message.",
			meta: {
				signedmessage: generatedMessage,
				hasError: hasError,
			},
		};
		modalStore.trigger(modal);
		signersprivatekey = ""
		message = ""
		passphrase = "";
		$loading = false;
	}
</script>

<form class="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 text-sm" on:submit|preventDefault={onSubmit}>
	<div class="flex flex-col gap-1">
		<label class="label">
			<span class="text-xs">Signer's Private Key</span>
			<textarea
				bind:value={signersprivatekey}
				required
				class="textarea bg-primary-100 text-sm h-48"
				rows="4"
				placeholder="Paste Signer's Private Key..."
			/>
		</label>
	</div>

	<div class="flex flex-col gap-1">
		<label class="label">
			<span class="text-xs">Message in Plain Text</span>
			<textarea bind:value={message} required class="textarea bg-primary-100 text-sm h-48" rows="4" placeholder="Your message..." />
		</label>
	</div>

	<div class="flex flex-col gap-1">
		<p>Passphrase</p>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] bg-primary-100">
			<div class="input-group-shim">🔐</div>
			<input bind:value={passphrase} required type="password" placeholder="Passphrase for Private Key" class="text-sm" />
		</div>

		<button type="submit" class="btn-sm btn variant-filled my-2">
			{#if $loading === true}
				<Spinner />
			{:else}
				Sign Message
			{/if}
		</button>
	</div>
</form>
