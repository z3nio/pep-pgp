<script lang="ts">
	import Spinner from "$lib/components/Spinner.svelte";
	import {delay, formatPgpBlock} from "$lib";
	import * as openpgp from "openpgp";
	import {writable} from "svelte/store";
	import {getModalStore} from "@skeletonlabs/skeleton";
	import type {ModalSettings} from "@skeletonlabs/skeleton";

	let loading = writable(false);

	let recieverprivatekey: string;
	let encryptedmessage: string;
	let signerpublickey: string;
	let passphrase: string;
	let hasError: boolean;
	let generatedMessage: openpgp.WebStream<string>;

	const modalStore = getModalStore();

	async function onSubmit() {
		$loading = true;
		await delay(100);

		try {
			const encryptedMessage = await openpgp.readMessage({armoredMessage: formatPgpBlock(encryptedmessage)});
			const recieverPrivateKey = await openpgp.decryptKey({
				privateKey: await openpgp.readPrivateKey({armoredKey: formatPgpBlock(recieverprivatekey)}),
				passphrase: passphrase,
			});
			const verificationKey = await openpgp.readKey({armoredKey: formatPgpBlock(signerpublickey)});

			const decryptedMessage = await openpgp.decrypt({
				message: encryptedMessage,
				decryptionKeys: recieverPrivateKey,
				verificationKeys: verificationKey,
				passwords: passphrase,
			});
			hasError = false
			generatedMessage = decryptedMessage.data
		} catch (e) {
			console.log(e)
			hasError = true
		}

		const modal: ModalSettings = {
			type: "component",
			component: "DecryptMessageModal",
			title: "Decrypted Message",
			body: "This is your decrypted message from the given encrypted message.",
			meta: {
				decryptedMessage: generatedMessage,
				hasError: hasError
			},
		};
		modalStore.trigger(modal);
		signerpublickey = ""
		encryptedmessage = ""
		recieverprivatekey = ""
		passphrase = "";
		$loading = false;
	}
</script>

<form class="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 text-sm" on:submit|preventDefault={onSubmit}>
	<div class="flex flex-col gap-1">
		<label class="label">
			<span class="text-xs">Signer's Public Key</span>
			<textarea
				bind:value={signerpublickey}
				required
				class="textarea bg-primary-100 text-sm h-48"
				rows="4"
				placeholder="Paste Signer's Public Key..."
			/>
		</label>
	</div>
	<div class="flex flex-col gap-1">
		<label class="label">
			<span class="text-xs">Message in Encrypted Text</span>
			<textarea
				bind:value={encryptedmessage}
				required
				class="textarea bg-primary-100 text-sm h-48"
				rows="4"
				placeholder="Paste Message in Encrypted Text..."
			/>
		</label>
	</div>
	<div class="flex flex-col gap-1">
		<label class="label">
			<span class="text-xs">Reciever's Private Key</span>
			<textarea
				bind:value={recieverprivatekey}
				required
				class="textarea bg-primary-100 text-sm h-48"
				rows="4"
				placeholder="Paste Reciever's Private Key..."
			/>
		</label>
	</div>
	<div />
	<div class="flex flex-col gap-1">
		<p>Passphrase</p>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] bg-primary-100">
			<div class="input-group-shim">🔐</div>
			<input bind:value={passphrase} type="password" required placeholder="Passphrase for Private Key" class="text-sm"  />
		</div>

		<button type="submit" class="btn-sm btn variant-filled my-2">
			{#if $loading === true}
				<Spinner />
			{:else}
				Decrypt Message
			{/if}
		</button>
	</div>
</form>
