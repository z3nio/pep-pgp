<script>
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
</script>

<div class="grid grid-cols-1 gap-2 p-2">
	
	
	
	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="summary"><h1 class="text-xl font-semibold underline underline-offset-4">What is Client-Side PGP Encryption?</h1></svelte:fragment>
			<svelte:fragment slot="content"><p>
				Client-side PGP encryption ensures that sensitive information is encrypted on the user's device. This method keeps the data private and secure, as the encryption keys never leave the user's device, and hence the encrypted content remains unreadable even if intercepted or accessed by unauthorized parties.
			</p></svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary"><h1 class="text-xl font-semibold underline underline-offset-4">Can I trust the security of client-side PGP operations?</h1></svelte:fragment>
			<svelte:fragment slot="content"><p>PEP relies on proven cryptographic algorithms and protocols that are executed on the user's own device, minimizing the risk of key exposure and data breaches.</p></svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary"><h1 class="text-xl font-semibold underline underline-offset-4">How do I manage my PGP keys within a privacy-first design?</h1></svelte:fragment>
			<svelte:fragment slot="content"><p>Management of PGP keys within a privacy-first app involves keeping your private keys secure on your device, using strong passphrases, and conducting all key generation and storage processes locally. Regularly back up your keys to secure locations.</p></svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary"><h1 class="text-xl font-semibold underline underline-offset-4">What happens if I lose my private key or passphrase?</h1></svelte:fragment>
			<svelte:fragment slot="content"><p>If you lose your private PGP key or forget your passphrase, you'll be unable to decrypt data that was encrypted with that key. It's critical to securely back up your keys and keep your passphrase in a safe place. In case of loss, you will need to generate a new key pair and revoke the lost key to maintain security.</p></svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary"><h1 class="text-xl font-semibold underline underline-offset-4">Are there any trade-offs with client-side encryption?</h1></svelte:fragment>
			<svelte:fragment slot="content"><p>While client-side encryption offers heightened privacy and security, it may come with trade-offs such as the responsibility of key management falling entirely on the user, potentially more complex setup processes, and the need for more processing power on the user's device. However, these are generally considered minor in comparison to the benefits of maintaining data privacy.</p></svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>

<style lang="postcss">
	ul {
		@apply list-disc p-2 flex flex-col gap-2;
	}
	li {
		@apply text-sm;
	}
</style>
