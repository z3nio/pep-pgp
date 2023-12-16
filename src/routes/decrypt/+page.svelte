<script lang="ts">
	import Spinner from "$lib/components/Spinner.svelte";
	import {delay, formatPgpBlock} from "$lib";
	import * as openpgp from "openpgp";
	import {modal} from "$lib/stores/modal";

	let loading = $state(false);
	let recieverprivatekey: string = $state("");
	let encryptedmessage: string = $state("");
	let signerpublickey: string = $state("");
	let passphrase: string = $state("");

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		loading = true;
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

			$modal.title = "Decrypted Message";
			$modal.description = "This is your decrypted message from the given encrypted message.";
			$modal.type = "DecryptedMessage";
			$modal.decryptedMessage = decryptedMessage.data as string;
			$modal.hasError = false;
			loading = false;
			$modal.isOpen = true;
		} catch (e) {
			console.log(e);
			$modal.hasError = true;
			$modal.errorMessage = e as string;
			$modal.isOpen = true;
			loading = false;
		}

		signerpublickey = "";
		encryptedmessage = "";
		recieverprivatekey = "";
		passphrase = "";
	}
</script>

<form onsubmit={onSubmit}>
	<label class="label-container">
		<p class="label">Signer's Public Key</p>
		<textarea bind:value={signerpublickey} rows="12" required placeholder="Paste Signer's Public Key..." />
	</label>
	<label class="label-container">
		<p class="label">Message in Encrypted Text</p>
		<textarea bind:value={encryptedmessage} rows="12" required placeholder="Paste Message in Encrypted Text..." />
	</label>
	<label class="label-container">
		<p class="label">Reciever's Private Key</p>
		<textarea bind:value={recieverprivatekey} rows="12" required placeholder="Paste Reciever's Private Key..." />
	</label>
	<div />
	<div>
		<label class="label-container">
			<p class="label">Passphrase</p>
			<div class="input-wrapper">
				<div class="input-icon">🔐</div>
				<input bind:value={passphrase} required type="password" placeholder="Passphrase for Private Key" />
			</div>
		</label>
		<button type="submit" class="button">
			{#if loading === true}
				<Spinner />
			{:else}
				Sign Message
			{/if}
		</button>
	</div>
</form>

<style>
	@media (min-width: 1024px) {
		form {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	form {
		display: grid;
		font-size: small;
		max-width: 100%;
		gap: 0.5rem;
	}
	.button {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		width: 100%;
	}
</style>
