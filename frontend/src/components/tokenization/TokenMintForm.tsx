"use client";

import { useState } from "react";
import { createMint } from "@solana/spl-token";
import type { Signer } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { walletAdapterToSigner } from "@/lib/solana/wallet-signer";

export function TokenMintForm() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [decimals, setDecimals] = useState("6");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onCreateMint() {
    setStatus(null);
    const signer = walletAdapterToSigner(wallet);
    if (!signer) {
      setStatus("Connect a wallet that can sign transactions.");
      return;
    }
    const dec = Number(decimals);
    if (!Number.isInteger(dec) || dec < 0 || dec > 9) {
      setStatus("Decimals must be an integer from 0 to 9.");
      return;
    }
    setBusy(true);
    try {
      const mint = await createMint(
        connection,
        signer as unknown as Signer,
        signer.publicKey,
        signer.publicKey,
        dec
      );
      setStatus(`Mint created: ${mint.toBase58()}`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Failed to create mint.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card title="Fungible RWA (SPL mint)">
      <p className="mb-4 text-sm text-zinc-400">
        Creates a new SPL Token mint with your wallet as mint authority. Use
        this for fractionalized RWA shares after you align compliance off-chain.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="decimals">Decimals</Label>
          <Input
            id="decimals"
            inputMode="numeric"
            value={decimals}
            onChange={(e) => setDecimals(e.target.value)}
          />
        </div>
        <Button disabled={busy || !wallet.connected} onClick={onCreateMint}>
          {busy ? "Submitting…" : "Create mint"}
        </Button>
        {status ? (
          <p className="break-all font-mono text-xs text-accent">{status}</p>
        ) : null}
      </div>
    </Card>
  );
}
