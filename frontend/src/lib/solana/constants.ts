import { PublicKey } from "@solana/web3.js";
import { parseCluster } from "./cluster";

export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME?.trim() || "RWA Solana";

export const DEFAULT_CLUSTER = parseCluster(
  process.env.NEXT_PUBLIC_SOLANA_NETWORK
);

export function getRwaProgramId(): PublicKey | null {
  const raw = process.env.NEXT_PUBLIC_RWA_PROGRAM_ID?.trim();
  if (!raw) return null;
  try {
    return new PublicKey(raw);
  } catch {
    return null;
  }
}

export function getRwaVault(): PublicKey | null {
  const raw = process.env.NEXT_PUBLIC_RWA_VAULT?.trim();
  if (!raw) return null;
  try {
    return new PublicKey(raw);
  } catch {
    return null;
  }
}

export const JUPITER_QUOTE_API =
  process.env.NEXT_PUBLIC_JUPITER_API_URL?.trim() ||
  "https://quote-api.jup.ag/v6";
