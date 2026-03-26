import {
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

/**
 * Example discriminators — replace with your Anchor IDL or native layout.
 * First 8 bytes often match Anchor's sighash for named instructions.
 */
export const RWA_IX = {
  /** Placeholder: register_asset */
  REGISTER_ASSET: Uint8Array.from([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
  /** Placeholder: mint_rwa_share */
  MINT_SHARE: Uint8Array.from([0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
} as const;

export function buildRawInstruction(params: {
  programId: PublicKey;
  data: Buffer;
  keys: { pubkey: PublicKey; isSigner: boolean; isWritable: boolean }[];
}): TransactionInstruction {
  return new TransactionInstruction({
    programId: params.programId,
    keys: params.keys.map((k) => ({
      pubkey: k.pubkey,
      isSigner: k.isSigner,
      isWritable: k.isWritable,
    })),
    data: params.data,
  });
}

export async function buildV0Tx(params: {
  payer: PublicKey;
  recentBlockhash: string;
  instructions: TransactionInstruction[];
}): Promise<VersionedTransaction> {
  const message = new TransactionMessage({
    payerKey: params.payer,
    recentBlockhash: params.recentBlockhash,
    instructions: params.instructions,
  }).compileToV0Message();

  return new VersionedTransaction(message);
}
