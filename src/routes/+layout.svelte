<script lang="ts">
	import "../app.postcss";
	import {base} from "$app/paths";
	import {page} from "$app/stores";
	import GenerateKeyModal from "$lib/components/GenerateKeyModal.svelte";
	import SignMessageModal from "$lib/components/SignMessageModal.svelte";
	import VerifyMessageModal from "$lib/components/VerifyMessageModal.svelte";
	import EncryptMessageModal from "$lib/components/EncryptMessageModal.svelte";
	import DecryptMessageModal from "$lib/components/DecryptMessageModal.svelte";
	import PepIcon from "$lib/components/PepIcon.svelte";
	import {AppShell, Modal} from "@skeletonlabs/skeleton";
	import type {ModalComponent} from "@skeletonlabs/skeleton";
	import {initializeStores} from "@skeletonlabs/skeleton";
	import {storePopup} from "@skeletonlabs/skeleton";
	import {computePosition, autoUpdate, flip, shift, offset, arrow} from "@floating-ui/dom";
	import {onMount} from "svelte";
	import {autoModeWatcher} from "@skeletonlabs/skeleton";
	import GithubIcon from "$lib/components/GithubIcon.svelte";

	storePopup.set({computePosition, autoUpdate, flip, shift, offset, arrow});
	initializeStores();
	onMount(() => {
		autoModeWatcher.toString();
		autoModeWatcher();
	});
	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		GenerateKeyModal: {ref: GenerateKeyModal},
		SignMessageModal: {ref: SignMessageModal},
		VerifyMessageModal: {ref: VerifyMessageModal},
		EncryptMessageModal: {ref: EncryptMessageModal},
		DecryptMessageModal: {ref: DecryptMessageModal},
		// ...
	};

	const routes = [
		{
			name: "Generate PGP Keys",
			path: "/",
		},
		{
			name: "Sign",
			path: "/sign",
		},
		{
			name: "Verify",
			path: "/verify",
		},
		{
			name: "Encrypt & Sign",
			path: "/encrypt",
		},
		{
			name: "Decrypt & Verify",
			path: "/decrypt",
		},
		{
			name: "About",
			path: "/about",
		},
	];
</script>

<Modal components={modalRegistry} />
<main class="container p-3 mx-auto lg:p-0">
	<AppShell>
		<svelte:fragment slot="header">
			<div class="flex items-center justify-center w-full p-3 my-6 text-xs text-center rounded-md bg-primary-500 text-primary-300">
				<p>PEP is a modern client-side application for processing PGP operations without revailing any of your secrets.</p>
			</div>

			<div class="flex items-center justify-between my-6">
				<div class="flex items-end gap-1">
					<PepIcon />
					<p class="text-xs">(pretty easy privacy)</p>
				</div>
				<div class="flex items-center gap-4">
					<a class="text-xs" href="https://github.com/z3nio/pep-pgp" aria-label="GitHub Repository" target="_blank"><GithubIcon /></a>
				</div>
			</div>
		</svelte:fragment>
		<section class="grid w-full h-full grid-cols-1 lg:grid-cols-5 rounded-xl">
			<nav
				class="col-span-1 p-3 rounded-tl-lg rounded-tr-lg dark:bg-primary-600 bg-primary-200 lg:rounded-tr-none lg:rounded-tl-lg lg:rounded-bl-lg h-fit lg:h-full"
			>
				<ul class="flex flex-col gap-2 font-light">
					{#each routes as route}
						<li
							class="rounded-lg hover:bg-primary-300 w-full"
							class:active={$page.url.pathname === base + (route.path === "/" ? "" : route.path)}
						>
							<a href={base + route.path} class="px-2 py-1 text-sm font-light rounded-md flex">{route.name}</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div
				class="col-span-4 p-3 rounded-tr-none rounded-bl-lg rounded-br-lg lg:rounded-bl-none lg:rounded-tr-lg bg-primary-300 dark:bg-primary-700"
			>
				<slot />
			</div>
		</section>
	</AppShell>
</main>

<style lang="postcss">
	.active {
		@apply font-semibold bg-primary-500 dark:bg-primary-200 text-primary-100 dark:text-primary-800;
	}
</style>
