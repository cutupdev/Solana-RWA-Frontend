"use client";

import { DEFAULT_CLUSTER } from "@/lib/solana/constants";

export function ClusterBanner() {
  return (
    <div className="rounded-lg border border-surface-border bg-surface-card px-4 py-3 text-sm text-zinc-300">
      Active cluster:{" "}
      <span className="font-mono text-accent">{DEFAULT_CLUSTER}</span>
      <span className="text-zinc-500">
        {" "}
        — set <code className="text-zinc-400">NEXT_PUBLIC_SOLANA_NETWORK</code>{" "}
        and optional RPC in <code className="text-zinc-400">.env.local</code>.
      </span>
    </div>
  );
}
