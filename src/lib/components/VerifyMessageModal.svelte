<script lang="ts">
	import type {SvelteComponent} from "svelte";
	import {getModalStore} from "@skeletonlabs/skeleton";

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Local
	export let isVerified: boolean | undefined = undefined;
	const modalStore = getModalStore();
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="p-4 space-y-4 shadow-xl modal-example-form card w-modal">
		<header class="text-2xl font-bold">{$modalStore[0].title ?? "(title missing)"}</header>
		<article>{$modalStore[0].body ?? "(body missing)"}</article>
		{#if $modalStore[0].meta.isVerified === true}
			<p class="text-sm p-2 bg-success-400 text-center text-white rounded-md">Signed message is valid.</p>
		{:else if $modalStore[0].meta.isVerified === false}
			<p class="text-sm p-2 bg-error-400 text-center text-white rounded-md">Signed message is not valid.</p>
		{/if}
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
    </footer>
	</div>
{/if}
