<script lang="ts">
	import { copyToClipboard } from "$lib";
	import {modal} from "../stores/modal";

	$effect(() => {
		// Reset when modal closes
		if ($modal.isOpen == false) {
			$modal.title = undefined;
			$modal.description = undefined;
			$modal.type = undefined;
			$modal.isOpen = undefined;
			$modal.hasError = undefined;
			$modal.errorMessage = undefined;
			$modal.generatedKeys = {
				publicKey: undefined,
				privateKey: undefined,
			};
			$modal.signedMessage = undefined;
			$modal.verifiedMessageStatus = undefined;
			$modal.encryptedMessage = undefined;
			$modal.decryptedMessage = undefined;
		}
	})

</script>


{#snippet GeneratedKeysContent()}
	<label class="label-container">
		<p class="label">Your Public Key</p>
		<textarea rows="7" disabled>{$modal.generatedKeys?.publicKey}</textarea>
		<button class="copy-button" onclick={() => copyToClipboard($modal.generatedKeys?.publicKey!)}>Copy</button>
	</label>
	<label class="label-container">
		<p class="label">Your Private Key</p>
		<textarea rows="7" disabled>{$modal.generatedKeys?.privateKey}</textarea>
		<button class="copy-button" onclick={() => copyToClipboard($modal.generatedKeys?.privateKey!)}>Copy</button>
	</label>
{/snippet}


{#snippet SignedMessageContent()}
	<label class="label-container">
		<p class="label">Signed Message</p>
		<textarea rows="7" disabled>{$modal.signedMessage}</textarea>
		<button class="copy-button" onclick={() => copyToClipboard($modal.signedMessage!)}>Copy</button>
	</label>
{/snippet}

{#snippet VerifiedMessageContent()}
	{#if $modal.verifiedMessageStatus === true}
		<p class="valid">Signed message is valid.</p>
	{/if}
{/snippet}

{#snippet EncryptedMessageContent()}
	<label class="label-container">
		<span class="label">Encrypted Message</span>
		<textarea rows="7" disabled>{$modal.encryptedMessage}</textarea>
		<button class="copy-button" onclick={() => copyToClipboard($modal.encryptedMessage!)}>Copy</button>
	</label>
{/snippet}

{#snippet DecryptedMessageContent()}
	<label class="label-container">
		<span class="label">Decrypted Message</span>
		<textarea rows="7" disabled>{$modal.decryptedMessage}</textarea>
		<button class="copy-button" onclick={() => copyToClipboard($modal.decryptedMessage!)}>Copy</button>
	</label>
{/snippet}

{#if $modal.isOpen}
	<div class="overlay">
		<div class="modal-container">
			<div class="header">
				<h3>{$modal.title}</h3>
				<p>{$modal.description}</p>
			</div>
			{#if $modal.hasError}
				<p class="error">
					Something went wrong.<br />
					{$modal.errorMessage}
				</p>
			{:else if $modal.hasError === false}
				{#if $modal.type === "GeneratedKeys"}
					{@render GeneratedKeysContent()}
				{:else if $modal.type === "SignedMessage"}
					{@render SignedMessageContent()}
				{:else if $modal.type === "VerifiedMessage"}
					{@render VerifiedMessageContent()}
				{:else if $modal.type === "EncryptedMessage"}
					{@render EncryptedMessageContent()}
				{:else if $modal.type === "DecryptedMessage"}
					{@render DecryptedMessageContent()}
				{/if}
			{/if}
			<div class="footer">
				<button class="button" onclick={async() => { $modal.isOpen = false; }}>Close</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@media (min-width: 320px) {
		.overlay {
			padding: 0.5rem;
		}
		.modal-container {
			padding: 0.5rem;
		}
	}
	.noscroll {
		overflow: hidden;
	}
	.overlay {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		position: fixed;
		z-index: 100;
		backdrop-filter: blur(1px);
		justify-content: center;
		align-items: center;
		bottom: 0;
		top: 0;
	}
	.modal-container {
		display: flex;
		flex-flow: column;
		width: 600px;
		height: auto;
		background-color: var(--sand-7);
		border-radius: 10px;
		padding: 1rem;
		gap: 0.75rem;
		justify-content: space-between;
	}
	.header {
		display: flex;
		flex-flow: column;
		gap: 0.5rem;
	}
	h3 {
		font-size: x-large;
		font-weight: 500;
	}
	p {
		font-size: small;
	}
	.footer {
		display: flex;
		justify-content: end;
		align-items: center;
	}
	.error {
		/* text-sm p-2 bg-error-400 text-center text-white rounded-md */
		font-size: small;
		padding: 0.5rem;
		background: #dd4425;
		text-align: center;
		color: var(--sand-1);
		border-radius: 7.5px;
	}
	.valid {
		/* text-sm p-2 bg-success-400 text-center text-white rounded-md */
		font-size: smaller;
		padding: 0.5rem;
		background-color: #53b365;
		text-align: center;
		color: var(--sand1);
		border-radius: 10px;
	}
	button {
		z-index: 10000;
	}
	.copy-button {
		background-color: var(--sand-9);
		padding: 0.5rem;
		border-radius: 0.5rem;
		font-size: smaller;
		width: fit-content;
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
		color: var(--sand-3);
		cursor: pointer;
	}
</style>
