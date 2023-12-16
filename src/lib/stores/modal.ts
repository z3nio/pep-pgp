import { writable } from "svelte/store";

interface ModalProps {
  isOpen: boolean | undefined
  title: string | undefined
  description: string | undefined
  type?: "GeneratedKeys" | "SignedMessage" | "VerifiedMessage" | "EncryptedMessage" | "DecryptedMessage" | undefined
  hasError: boolean | undefined
  errorMessage?: string | undefined
  generatedKeys?: {
    publicKey: string | undefined
    privateKey: string | undefined
  }
  signedMessage?: string | undefined
  verifiedMessageStatus?: boolean | undefined
  encryptedMessage?: string | undefined
  decryptedMessage?: string | undefined
}

export const modal = writable<ModalProps>({
  isOpen: false,
  title: "Title",
  description: "Description",
  hasError: false,
  generatedKeys: {
    publicKey: undefined,
    privateKey: undefined
  },
  signedMessage: undefined,
  verifiedMessageStatus: undefined,
  encryptedMessage: undefined,
  decryptedMessage: undefined
})