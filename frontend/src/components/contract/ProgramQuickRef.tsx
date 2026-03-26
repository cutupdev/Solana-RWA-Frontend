"use client";

import { Card } from "@/components/ui/Card";
import { RWA_IX } from "@/lib/solana/rwa-instructions";

function toHex(u8: Uint8Array) {
  return Buffer.from(u8).toString("hex");
}

export function ProgramQuickRef() {
  return (
    <Card title="Placeholder discriminators">
      <p className="mb-4 text-sm text-zinc-400">
        Replace these bytes with real Anchor sighashes or your native layout.
        Paste into the hex field on the left after selecting your program id.
      </p>
      <dl className="space-y-3 font-mono text-xs text-zinc-300">
        <div>
          <dt className="text-zinc-500">REGISTER_ASSET</dt>
          <dd className="break-all text-accent">{toHex(RWA_IX.REGISTER_ASSET)}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">MINT_SHARE</dt>
          <dd className="break-all text-accent">{toHex(RWA_IX.MINT_SHARE)}</dd>
        </div>
      </dl>
    </Card>
  );
}
