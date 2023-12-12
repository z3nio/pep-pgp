<script lang="ts">
	import Spinner from "$lib/components/Spinner.svelte";
	import {delay, formatPgpBlock} from "$lib";
	import * as openpgp from "openpgp";
	import {writable} from "svelte/store";
	import type {ModalSettings} from "@skeletonlabs/skeleton";
	import {getModalStore} from "@skeletonlabs/skeleton";

	let loading = writable(false);

	let recieverpublickey: string;
	let message: string;
	let signerprivatekey: string;
	let passphrase: string;
	let hasError: boolean;
	let generatedMessage: openpgp.WebStream<string>;

	const modalStore = getModalStore();

	async function onSubmit() {
		$loading = true;
		await delay(100);

		try {
			const encryptedmessage = await openpgp.createMessage({text: message});
			const signerPrivateKey = await openpgp.decryptKey({
				privateKey: await openpgp.readPrivateKey({armoredKey: formatPgpBlock(signerprivatekey)}),
				passphrase: passphrase,
			});
			const recieverPublicKey = await openpgp.readKey({armoredKey: formatPgpBlock(recieverpublickey)});

			const encryptedMessage = await openpgp.encrypt({
				message: encryptedmessage,
				encryptionKeys: recieverPublicKey,
				signingKeys: signerPrivateKey,
				passwords: passphrase,
			});
			hasError = false;
			generatedMessage = encryptedMessage;
		} catch (e) {
			console.log(e);
			hasError = true;
		}

		const modal: ModalSettings = {
			type: "component",
			component: "EncryptMessageModal",
			title: "Encrypted Message",
			body: "This is your encrypted message. This message is secure to share. The reciever will need your public key to decrypt this message.",
			meta: {
				encryptedMessage: generatedMessage,
				hasError: hasError,
			},
		};
		modalStore.trigger(modal);
		recieverpublickey = "";
		message = "";
		signerprivatekey = "";
		passphrase = "";
		$loading = false;
	}
</script>

<form class="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 text-sm" on:submit|preventDefault={onSubmit}>
	<div class="flex flex-col gap-1">
		<label class="label">
			<span class="text-xs">Reciever's Public Key</span>
			<textarea
				bind:value={recieverpublickey}
				required
				class="textarea bg-primary-100 text-sm h-48"
				rows="4"
				placeholder="Paste Reciever's Public Key..."
			/>
		</label>
	</div>
	<div class="flex flex-col gap-1">
		<label class="label">
			<span class="text-xs">Message in Plain Text</span>
			<textarea bind:value={message} required class="textarea bg-primary-100 text-sm h-48" rows="4" placeholder="Your Message..." />
		</label>
	</div>
	<div class="flex flex-col gap-1">
		<label class="label">
			<span class="text-xs">Signer's Private Key</span>
			<textarea
				bind:value={signerprivatekey}
				required
				class="textarea bg-primary-100 text-sm h-48"
				rows="4"
				placeholder="Paste Signer's Private Key..."
			/>
		</label>
	</div>
	<div />
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
				Encrypt Message
			{/if}
		</button>
	</div>
</form>
