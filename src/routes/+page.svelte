<script lang="ts">
	import Spinner from "$lib/components/Spinner.svelte";
	import {delay, formatPgpBlock} from "$lib";
	import * as openpgp from "openpgp/lightweight";
	import {modal} from "$lib/stores/modal";

	let loading = $state(false);
	let name: string = $state("");
	let email: string = $state("");
	let algorithm: "rsa" | "ecc" = $state("rsa");
	let keysize: 2048 | 4096 | "" | undefined = $state("");
	let duration: number | "" = $state("");
	let passphrase: string = $state("");

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault()
		loading = true;
		await delay(100);
		try {
			const {privateKey, publicKey, revocationCertificate} = await openpgp.generateKey({
				keyExpirationTime: Number(duration),
				rsaBits: Number(keysize),
				type: algorithm, // Type of the key, defaults to ECC
				userIDs: [{name: name, email: email}], // you can pass multiple user IDs
				passphrase: passphrase, // protects the private key
				format: "armored", // output key format, defaults to 'armored' (other options: 'binary' or 'object')
			});

			$modal.title = "Generated PGP Keys";
			$modal.description = "This is your generated public & private key. Please store this sensitive information somewhere secure.";
			$modal.type = "GeneratedKeys";
			$modal.generatedKeys!.publicKey = publicKey;
			$modal.generatedKeys!.privateKey = privateKey;
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
		
		name = "";
		email = "";
		algorithm = "rsa";
		keysize = "";
		duration = "";
		passphrase = "";
	}
</script>

<form onsubmit={onSubmit}>
	<label class="label-container">
		<p class="label">Your Name</p>
		<div class="input-wrapper">
			<div class="input-icon">👤</div>
			<input bind:value={name} required type="text" placeholder="The Pickle" />
		</div>
	</label>

	<label class="label-container">
		<p class="label">Your Email</p>
		<div class="input-wrapper">
			<div class="input-icon">📨</div>
			<input bind:value={email} required type="email" placeholder="me@example.com" />
		</div>
	</label>

	<label class="label-container">
		<p class="label">Algorithm</p>
		<div class="select-wrapper">
			<select bind:value={algorithm} required>
				<option value="rsa">RSA (Default)</option>
				<option value="ecc">ECC (Elliptic-curve cryptography)</option>
			</select>
		</div>
	</label>

	{#if algorithm !== "ecc"}
		<label class="label-container">
			<p class="label">Key Size (RSA Bits)</p>
			<div class="select-wrapper">
				<select bind:value={keysize} required>
					<option value="" selected>Please Select Key Size...</option>
					<option value="4096">4096 (Recommended)</option>
					<option value="2048">2048</option>
				</select>
			</div>
		</label>
	{/if}

	<label class="label-container">
		<p class="label">Valid Duration</p>
		<div class="select-wrapper">
			<select bind:value={duration} required>
				<option value="" disabled selected>Please Select Duration...</option>
				<option value={1000 * 60 * 60 * 24 * 365 * 1}>1 Year</option>
				<option value={1000 * 60 * 60 * 24 * 365 * 2}>2 Year</option>
				<option value={1000 * 60 * 60 * 24 * 365 * 4}>4 Year</option>
			</select>
		</div>
	</label>

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
			Generate PGP Key Pair
		{/if}
	</button>
</form>

<style>
	.select-wrapper {
		position: relative;
		width: 100%;
	}
	.select-wrapper::after {
		content: "v"; /* Unicode character for down arrow */
		position: absolute;
		transform: translateY(-50%);
		top: 50%;
		right: 1rem; /* Position arrow at the end of the select box */
		pointer-events: none; /* Ensures the arrow does not interfere with the select box's functionality */
		color: var(--sand-10); /* Arrow color - pick whatever suits your design */
	}
	@media (min-width: 1024px) {
		form {
			max-width: 400px;
		}
		.select-wrapper {
			max-width: 100%;
		}
	}
	form {
		display: flex;
		flex-flow: column;
		font-size: small;
		gap: 0.5rem;
	}
	select {
		padding: 0.6rem;
		width: 100%;
		font-size: small;
		background-color: var(--sand-4);
		appearance: none;
		-moz-appearance: none; /* Firefox specific prefix */
		-webkit-appearance: none; /* Chrome & Safari specific prefix */
		border: 1px solid var(--sand-8);
		cursor: pointer;
		color: var(--sand-10);
		border-radius: 10px;
	}
	label {
		font-size: 12px;
		margin-top: 2px;
		margin-bottom: 2px;
	}
</style>
