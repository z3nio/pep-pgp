<script lang="ts">
	// Supports weights 100-900
	import "@fontsource-variable/inter";
	import "../reset.css";
	import {base} from "$app/paths";
	import {page} from "$app/stores";
	import PepIcon from "$lib/components/PepIcon.svelte";
	import GithubIcon from "$lib/components/GithubIcon.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import { modal } from "$lib/stores/modal";

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

{#key $modal.isOpen}
<Modal />
{/key}

<main class="container">
	<header>
		<div class="banner-top container">
			<p style="font-size: 12px;">PEP is a modern client-side PGP application for processing encryption and decryption without revailing any of your secrets.</p>
		</div>

		<div class="banner">
			<div class="banner-logo">
				<PepIcon />
				<p style="font-size: x-small;">(pretty easy privacy)</p>
			</div>
			<a href="https://github.com/z3nio/pep-pgp" aria-label="GitHub Repository" target="_blank"><GithubIcon /></a>
		</div>
	</header>
	<section>
		<nav>
			<ul>
				{#each routes as route}
					<li class:active={$page.url.pathname === base + (route.path === "/" ? "" : route.path)}>
						<a href={base + route.path} class="nav-link">{route.name}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="content">
			<slot />
		</div>
	</section>
</main>

<style>
	:global(body) {
		font-family: "Inter Variable", sans-serif;
	}
	:global(:root) {
		--sand-1: #fdfdfc;
		--sand-2: #f9f9f8;
		--sand-3: #f1f0ef;
		--sand-4: #e9e8e6;
		--sand-5: #e2e1de;
		--sand-6: #dad9d6;
		--sand-7: #cfceca;
		--sand-8: #bcbbb5;
		--sand-9: #8d8d86;
		--sand-10: #82827c;
		--sand-11: #63635e;
		--sand-12: #21201c;
	}
	:global(.container) {
		width: 100%;
		margin: auto;
	}
	:global(::-webkit-scrollbar) {
		width: 10px;
	}
	:global(::-webkit-scrollbar-track) {
		background-color: transparent;
	}
	:global(::-webkit-scrollbar-thumb) {
		background-color: var(--sand-6);
		border-radius: 4px;
	}
	:global(::-webkit-scrollbar-thumb:hover) {
		background-color: var(--sand-3);
	}
	@media (min-width: 320px) {
		:global(.container) {
			max-width: 640px;
			padding: 0.5rem;
		}
		section {
			grid-template-columns: repeat(1, 1fr);
		}
		nav {
			border-top-right-radius: 10px;
			border-top-left-radius: 10px;
		}
		.content {
			border-bottom-right-radius: 10px;
			border-bottom-left-radius: 10px;
		}
	}
	@media (min-width: 768px) {
		:global(.container) {
			max-width: 768px;
			padding: 0rem;
		}
		section {
			grid-template-columns: repeat(5, 1fr);
		}
		nav {
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
			border-top-right-radius: 0px;
		}
		.content {
			border-bottom-right-radius: 10px;
			border-top-right-radius: 10px;
			border-bottom-left-radius: 0px;
		}
		:global(form) {
			width: 100%;
		}
	}
	@media (min-width: 1024px) {
		:global(.container) {
			max-width: 1024px;
			padding: 0rem;
		}
		nav {
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
		}
	}
	@media (min-width: 1280px) {
		:global(.container) {
			max-width: 1280px;
		}
	}
	@media (min-width: 1536px) {
		:global(.container) {
			max-width: 1536px;
		}
	}

	:global(.label) {
		font-size: 12px;
		margin-top: 2px;
		margin-bottom: 2px;
	}
	:global(input) {
		padding: 0.6rem;
		padding-left: 2rem;
		border-radius: 10px;
		width: 100%;
		font-size: small;
		background-color: var(--sand-4);
		border: 1px solid var(--sand-8);
		color: var(--sand-11);
	}
	:global(textarea) {
		padding: 0.5rem;
		border-radius: 10px;
		font-size: small;
		background-color: var(--sand-4);
		border: 1px solid var(--sand-8);
		color: var(--sand-11);
		word-break: break-all;
	}
	:global(textarea:disabled) {
		background-color: var(--sand-5);
		color: var(--sand-9);
		cursor: not-allowed;
	}
	:global(.input-icon) {
		position: absolute;
		padding: 0px 0.5rem 0px 0.5rem;
	}
	:global(.input-wrapper) {
		grid-column: auto 1fr auto;
		display: flex;
		align-items: center;
	}
	:global(.button) {
		text-align: center;
		background-color: var(--sand-12);
		color: var(--sand-2);
		border-radius: 10px;
		padding: 0.5rem;
		cursor: pointer;
		transition: all;
		transition-duration: 150ms;
	}
	:global(.button:hover) {
		background-color: var(--sand-11);
		cursor: pointer;
	}
	:global(.label-container) {
		display: flex;
		flex-flow: column;
	}
	:global(input::placeholder, textarea::placeholder) {
		color: var(--sand-9);
	}
	.banner-top {
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 0.75rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
		font-size: small;
		text-align: center;
		border-radius: 10px;
		background-color: var(--sand-7);
		color: var(--sand-12);
	}
	.banner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	.banner-logo {
		display: flex;
		align-items: end;
	}
	section {
		display: grid;
		width: 100%;
		height: 100%;
		grid-column: span 1 / span 1;
		border-radius: 15px;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	nav {
		column-span: 1;
		background-color: var(--sand-7);
		height: 100%;
		overflow: hidden;
	}
	ul {
		list-style: none;
		display: flex;
		flex-flow: column;
		gap: 0.25rem;
		padding: 0.75rem;
		font-weight: 400;
		font-size: small;
	}
	li {
		border-radius: 10px;
		width: 100%;
		padding: 0;
	}
	.nav-link {
		display: flex;
		padding: 0.4rem;
		width: 100%;
		height: 100%;
		border-radius: 7.5px;
		text-decoration: none;
	}
	.nav-link:hover {
		background-color: var(--sand-5);
	}
	.active {
		font-weight: bold;
		background-color: var(--sand-9);
		color: var(--sand-2);
	}
	.content {
		grid-column: span 4 / span 4;
		padding: 0.5rem;
		background-color: var(--sand-6);
	}
</style>
