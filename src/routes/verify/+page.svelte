<script lang="ts">
	import {modal} from "$lib/stores/modal";
	import {formatPgpBlock} from "$lib";
	import Spinner from "$lib/components/Spinner.svelte";
	import {delay} from "$lib";
	import * as openpgp from "openpgp";

	let loading = $state(false);
	let signerspublickey: string = $state("");
	let signedmessage: string = $state("");
	let isVerified: boolean = $state(false);

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault()
		loading = true;
		await delay(100);
		try {
			const publicKey = await openpgp.readKey({armoredKey: formatPgpBlock(signerspublickey)});
			const message = await openpgp.readCleartextMessage({cleartextMessage: signedmessage.trim()});
			const {signatures} = await openpgp.verify({
				message: message,
				verificationKeys: publicKey,
			});
			if (signatures.length > 0) {
				$modal.title = "Verified Message Status";
				$modal.description = "This is the status of the signed message.";
				$modal.type = "VerifiedMessage";
				$modal.verifiedMessageStatus = true;
				$modal.hasError = false;
				loading = false;
				$modal.isOpen = true;
			}
		} catch (e) {
			console.log(e);
			$modal.hasError = true;
			$modal.isOpen = true;
			$modal.errorMessage = e as string;
			isVerified = false;
		}
		
		signerspublickey = "";
		signedmessage = "";
	}
</script>

<form onsubmit={onSubmit}>
	<label class="label-container">
		<p class="label">Signer's Public Key</p>
		<textarea bind:value={signerspublickey} rows="12" required placeholder="Paste Signer's Public Key..." />
	</label>
	<label class="label-container">
		<p class="label">Signed Message</p>
		<textarea bind:value={signedmessage} rows="12" placeholder="Paste Signed Message..." />
	</label>
	<button type="submit" class="button">
		{#if loading === true}
			<Spinner />
		{:else}
			Verify Signed Message
		{/if}
	</button>
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
