import type {
  PublicKey,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import type { WalletContextState } from "@solana/wallet-adapter-react";

/** Shape consumed by @solana/spl-token after casting to `Signer`. */
export interface AdapterSigner {
  publicKey: PublicKey;
  signTransaction: <T extends Transaction | VersionedTransaction>(
    tx: T
  ) => Promise<T>;
  signAllTransactions?: <T extends Transaction | VersionedTransaction>(
    txs: T[]
  ) => Promise<T[]>;
}

export function walletAdapterToSigner(
  wallet: WalletContextState
): AdapterSigner | null {
  if (!wallet.publicKey || !wallet.signTransaction) return null;

  return {
    publicKey: wallet.publicKey,
    signTransaction: async <T extends Transaction | VersionedTransaction>(
      tx: T
    ): Promise<T> => {
      const signed = await wallet.signTransaction!(tx);
      return signed as T;
    },
    signAllTransactions: wallet.signAllTransactions
      ? async <T extends Transaction | VersionedTransaction>(
          txs: T[]
        ): Promise<T[]> => {
          const out = await wallet.signAllTransactions!(txs);
          return out as T[];
        }
      : undefined,
  };
}
