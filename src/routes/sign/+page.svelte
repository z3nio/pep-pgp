<script lang="ts">
	import {delay, formatPgpBlock} from "$lib";
	import Spinner from "$lib/components/Spinner.svelte";
	import {modal} from "$lib/stores/modal";
	import * as openpgp from "openpgp";

	let loading = $state(false);
	let signersprivatekey: string = $state("");
	let message: string = $state("");
	let passphrase: string = $state("");

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault()
		loading = true;
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
			$modal.title = "Signed PGP Message";
			$modal.description =
				"This is your signed message. This information can be shared with others so that they can verify the signed message.";
			$modal.type = "SignedMessage";
			$modal.signedMessage = signedMessage;
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
		
		signersprivatekey = "";
		message = "";
		passphrase = "";
	}
</script>

<form onsubmit={onSubmit}>
	<label class="label-container">
		<p class="label">Signer's Private Key</p>
		<textarea bind:value={signersprivatekey} rows="12" required placeholder="Paste Signer's Private Key..." />
	</label>

	<label class="label-container">
		<p class="label">Message in Plain Text</p>
		<textarea bind:value={message} rows="12" required placeholder="Your message..." />
	</label>

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
