<script lang="ts">
	let tabs = [
		{
			id: 1,
			title: "What is PGP Encryption ?",
			content:
				"Pretty Good Privacy (PGP) is an encryption system used for both sending encrypted emails and encrypting sensitive files. Since its invention back in 1991, PGP has become the de facto standard for email security. The popularity of PGP is based on two factors. The first is that the system was originally available as freeware, and so spread rapidly among users who wanted an extra level of security for their email messages. The second is that since PGP uses both symmetric encryption and public-key encryption, it allows users who have never met to send encrypted messages to each other without exchanging private encryption keys. If you want to improve the security of your email messages, PGP offers a relatively easy and cost-effective way to do this.",
		},
		{
			id: 2,
			title: "Generating Your PGP Key Pair",
			content: "The passphrase will be vital for accessing your private key and decrypting messages, so it should be both secure and unforgettable. This process will yield two keys: a public key, which you can share with others to receive encrypted messages, and a private key, which must be kept secure at all times as it is used to decrypt messages meant for you. Once the generation of your keys is completed, take an important security step by backing up both keys to a secure location.",
		},
		{
			id: 3,
			title: "Why a Dialog is used to show the results ?",
			content: "Creating a dialog box to secure the displayed results of encrypted and signed communications is an important step to enhance the security and privacy of your sensitive data. When the encryption or signing process is complete, the dialog box serves as a secure container for presenting the output—which could be encrypted text, a digital signature, or any other result of your cryptographic operations.Moreover, the dialog box typically includes features designed to prevent unauthorized access or tampering. The input fields also reset on per submit to ensure to keep the credentials and message safe.",
		},
		{
			id: 4,
			title: "Generated Key",
			content: "If the user generates a new public-private key pair, the dialog popup will present the results of this process. This includes the public key, which can be freely distributed to others, and the private key, which must remain confidential. The user should securely save or back up these keys, especially the private key, which is critical for decrypting received messages and is irreplaceable if lost.",
		},
		{
			id: 5,
			title: "Signed Message",
			content: "When a user signs a message, the dialog popup will show signature block. This digital signature is created using the sender's private key and can be appended to or sent along with the original message. Recipients can use the sender's public key to verify the signature, which ensures message integrity and sender authenticity.",
		},
		{
			id: 6,
			title: "Verified Message",
			content: "In the context of verifying digital signatures, the dialog popup will indicate whether the verification process was successful ('valid') or unsuccessful ('not valid'). A verified, valid response implies that the digital signature matches the public key of the purported sender and that the message has not been tampered with since it was signed. An invalid indication suggests the opposite—that the signature does not match, which could mean the message's integrity is compromised or the sender is not who they claim to be.",
		},
		{
			id: 7,
			title: "Encrypted Message",
			content: "When a message is encrypted, the dialog popup will show the resulting ciphertext. This is the scrambled, unreadable text that has been securely transformed from the plaintext message using the recipient's public key. This encrypted text is meant to be shared with the intended recipient, who can then decrypt it using their corresponding private key.",
		},
		{
			id: 8,
			title: "Decrypted Message",
			content: "Upon receiving an encrypted message, the dialog popup will display the decrypted message response after the user enters their private key and passphrase. This is the plaintext that has been retrieved from the encrypted message. It signifies that the decryption process was successful and the content can now be read in its original form.",
		},
	];

	let currentTab = $state<number>(1);
</script>

<div class="content">
	<div class="left-side">
		<h1>About PGP</h1>
		<ul>
			{#each tabs as tab}
				<li><button type="button" onclick={() => (currentTab = tab.id)}>{tab.title}</button></li>
			{/each}
		</ul>
	</div>

	<div class="right-side">
		{#each tabs as tab}
			{#if currentTab === tab.id}
				<h1>{tab.title}</h1>
				<p>{tab.content}</p>
			{/if}
		{/each}
	</div>
</div>

<style>
	@media(min-width: 320px) {
		.content {
			display: flex;
			flex-flow: column;
			gap: 1rem;
		}
	}
	@media(min-width: 1024px) {
		.content {
			display: grid;
			grid-template-columns: repeat(6, 1fr);
			gap: 1rem;
		}
	}
	.left-side {
		grid-column: span 2 / span 2;
		background-color: var(--sand-5);
		border-radius: 1rem;
		padding: 1rem;
	}
	.right-side {
		grid-column: span 4 / span 4;
		background-color: var(--sand-4);
		border-radius: 1rem;
		padding: 1rem;
	}
	h1 {
		margin-bottom: 0.75rem;
		font-size: x-large;
		font-weight: 900;
		font-family: "Times New Roman", Times, serif;
		color: var(--sand-12);
	}
	p {
		font-weight: 400;
		font-size: 14px;
		margin-top: 0.25rem;
		color: var(--sand-11);
	}
	ul {
		padding-left: 1.5rem;
		list-style-type: square;
	}
	li {
		padding-top: 0.15rem;
		padding-bottom: 0.15rem;
		color: var(--sand-11);
	}
	button {
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 0.25rem;
	}
	button:hover {
			color: var(--sand-12);
		}
</style>
