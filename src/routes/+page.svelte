<script lang="ts">
	import Spinner from "$lib/components/Spinner.svelte";
	import {delay, formatPgpBlock} from "$lib";
	import {writable} from "svelte/store";
	import {getModalStore} from "@skeletonlabs/skeleton";
	import type {ModalSettings} from "@skeletonlabs/skeleton";
	import * as openpgp from "openpgp/lightweight";

	let loading = writable(false);

	let name: string;
	let email: string;
	let algorithm: "rsa" | "ecc";
	let keysize: 2048 | 4096 | "" | undefined;
	let duration: number | "";
	let passphrase: string;
	let hasError: boolean;
	let generatedPrivateKey: string;
	let generatedPublicKey: string;

	const modalStore = getModalStore();

	async function onSubmit() {
		$loading = true;
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
			hasError = false;
			generatedPrivateKey = privateKey;
			generatedPublicKey = publicKey;
		} catch (e) {
			console.log(e);
			hasError = true;
		}

		const modal: ModalSettings = {
			type: "component",
			component: "GenerateKeyModal",
			title: "Generated PGP Key",
			body: "This is your generated public & private key. Please store this sensitive information somewhere secure.",
			meta: {
				publickey: formatPgpBlock(generatedPublicKey),
				privatekey: formatPgpBlock(generatedPrivateKey),
				hasError: hasError,
			},
		};
		modalStore.trigger(modal);
		name = "";
		email = "";
		algorithm = "rsa";
		keysize = "";
		duration = "";
		passphrase = "";
		$loading = false;
	}
</script>

<form class="flex flex-col lg:max-w-sm gap-2 text-sm" on:submit|preventDefault={onSubmit}>
	<div class="flex flex-col gap-1">
		<p>Your Name</p>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] bg-primary-100">
			<div class="input-group-shim">👤</div>
			<input bind:value={name} required type="text" placeholder="The Pickle" class="text-sm" />
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<p>Your Email</p>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] bg-primary-100">
			<div class="input-group-shim">📨</div>
			<input bind:value={email} required type="email" placeholder="me@example.com" class="text-sm" />
		</div>
	</div>

	<label class="label flex flex-col gap-1">
		<p>Algorithm</p>
		<select bind:value={algorithm} required class="text-sm select bg-primary-100">
			<option value="rsa">RSA (Default)</option>
			<option value="ecc">ECC (Elliptic-curve cryptography)</option>
		</select>
	</label>

	{#if algorithm !== "ecc"}
	<label class="label flex flex-col gap-1">
		<p>Key Size (RSA Bits)</p>
		<select bind:value={keysize} required class="text-sm select bg-primary-100">
			<option value="" selected >Please Select Key Size...</option>
			<option value="4096" >4096 (Recommended)</option>
			<option value="2048">2048</option>
		</select>
	</label>
	{/if}

	<label class="label flex flex-col gap-1">
		<p>Valid Duration</p>
		<select bind:value={duration} required class="text-sm select bg-primary-100">
			<option value="" disabled selected>Please Select Duration...</option>
			<option value={1000 * 60 * 60 * 24 * 365 * 1}>1 Year</option>
			<option value={1000 * 60 * 60 * 24 * 365 * 2}>2 Year</option>
			<option value={1000 * 60 * 60 * 24 * 365 * 4}>4 Year</option>
		</select>
	</label>

	<div class="flex flex-col gap-1">
		<p>Passphrase</p>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] bg-primary-100">
			<div class="input-group-shim">🔐</div>
			<input bind:value={passphrase} required type="password" placeholder="Passphrase for Private Key" class="text-sm" />
		</div>
	</div>
	<button type="submit" class="btn-sm btn variant-filled">
		{#if $loading === true}
			<Spinner />
		{:else}
			Generate PGP Key Pair
		{/if}
	</button>
</form>
