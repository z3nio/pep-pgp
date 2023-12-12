<script lang="ts">
	import type {SvelteComponent} from "svelte";
	import {clipboard} from "@skeletonlabs/skeleton";
	import {getModalStore} from "@skeletonlabs/skeleton";

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Local
	export let signedmessage: string | undefined = undefined;
	export let hasError: boolean | undefined = undefined;
	const modalStore = getModalStore();
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="p-4 space-y-4 shadow-xl modal-example-form card w-modal">
		<header class="text-2xl font-bold">{$modalStore[0].title ?? "(title missing)"}</header>
		<article>{$modalStore[0].body ?? "(body missing)"}</article>
		{#if $modalStore[0].meta.hasError === true}
			<p class="text-sm p-2 bg-error-400 text-center text-white rounded-md">
				Something went wrong please check the fields are correct and valid.
			</p>
		{:else if $modalStore[0].meta.hasError === false}
			<label class="label">
				<div class="flex gap-2 items-center"> 
					<span class="text-sm">Signed Message</span>
				</div>
				<textarea class="text-sm textarea" rows="4" disabled>{$modalStore[0].meta.signedmessage}</textarea>
				<button class="btn btn-sm bg-primary-300 text-xs" use:clipboard={$modalStore[0].meta.signedmessage}>Copy</button>
			</label>
		{/if}

		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
    </footer>
	</div>
{/if}
