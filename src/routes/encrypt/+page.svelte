<script lang="ts">
	import Spinner from "$lib/components/Spinner.svelte";
	import {delay, formatPgpBlock} from "$lib";
	import * as openpgp from "openpgp";
	import {modal} from "$lib/stores/modal";

	let loading = $state(false);
	let recieverpublickey: string = $state("");
	let message: string = $state("");
	let signerprivatekey: string = $state("");
	let passphrase: string = $state("");

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault()
		loading = true;
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

			$modal.title = "Encrypted Message";
			$modal.description =
				"This is your encrypted message. This message is secure to share. The reciever will need your public key to decrypt this message.";
			$modal.type = "EncryptedMessage";
			$modal.encryptedMessage = encryptedMessage as string;
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

		recieverpublickey = "";
		message = "";
		signerprivatekey = "";
		passphrase = "";
	}
</script>

<form onsubmit={onSubmit}>
	<label class="label-container">
		<p class="label">Reciever's Public Key</p>
		<textarea bind:value={recieverpublickey} rows="12" required placeholder="Paste Reciever's Public Key..." />
	</label>
	<label class="label-container">
		<p class="label">Message in Plain Text</p>
		<textarea bind:value={message} rows="12" required placeholder="Your Message..." />
	</label>
	<label class="label-container">
		<p class="label">Signer's Private Key</p>
		<textarea bind:value={signerprivatekey} rows="12" required placeholder="Paste Signer's Private Key..." />
	</label>
	<div class="blank-column"></div>
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
			{/if}</button
		>
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
