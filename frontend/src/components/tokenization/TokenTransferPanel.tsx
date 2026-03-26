"use client";

import { useState } from "react";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";

export function TokenTransferPanel() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [mint, setMint] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("1");
  const [decimals, setDecimals] = useState("6");
  const [log, setLog] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onTransfer() {
    setLog(null);
    if (!wallet.publicKey || !wallet.sendTransaction) {
      setLog("Connect a wallet that can send transactions.");
      return;
    }
    let mintPk: PublicKey;
    let destOwner: PublicKey;
    try {
      mintPk = new PublicKey(mint.trim());
      destOwner = new PublicKey(recipient.trim());
    } catch {
      setLog("Invalid mint or recipient address.");
      return;
    }
    const dec = Number(decimals);
    const raw = Number(amount);
    if (!Number.isInteger(dec) || dec < 0 || dec > 9) {
      setLog("Decimals must be 0–9.");
      return;
    }
    if (!Number.isFinite(raw) || raw <= 0) {
      setLog("Amount must be positive.");
      return;
    }
    const units = BigInt(Math.round(raw * 10 ** dec));
    setBusy(true);
    try {
      const sourceAta = await getAssociatedTokenAddress(
        mintPk,
        wallet.publicKey,
        false,
        TOKEN_PROGRAM_ID
      );
      const destAta = await getAssociatedTokenAddress(
        mintPk,
        destOwner,
        false,
        TOKEN_PROGRAM_ID
      );
      const ix = createTransferInstruction(
        sourceAta,
        destAta,
        wallet.publicKey,
        units,
        [],
        TOKEN_PROGRAM_ID
      );
      const latest = await connection.getLatestBlockhash();
      const tx = new Transaction({
        feePayer: wallet.publicKey,
        recentBlockhash: latest.blockhash,
      }).add(ix);
      const sig = await wallet.sendTransaction(tx, connection, {
        skipPreflight: false,
      });
      await connection.confirmTransaction({
        signature: sig,
        blockhash: latest.blockhash,
        lastValidBlockHeight: latest.lastValidBlockHeight,
      });
      setLog(`Transfer confirmed: ${sig}`);
    } catch (e) {
      setLog(e instanceof Error ? e.message : "Transfer failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card title="Transfer RWA shares (SPL)">
      <p className="mb-4 text-sm text-zinc-400">
        Sends from your associated token account for the given mint. Ensure the
        recipient already has an ATA for this mint, or add an ATA-creation
        instruction in your program flow.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="mint-tt">Mint</Label>
          <Input
            id="mint-tt"
            className="font-mono text-xs"
            value={mint}
            onChange={(e) => setMint(e.target.value)}
            placeholder="RWA mint address"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="to-tt">Recipient owner</Label>
          <Input
            id="to-tt"
            className="font-mono text-xs"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="amt-tt">Amount (human)</Label>
          <Input
            id="amt-tt"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="dec-tt">Decimals</Label>
          <Input
            id="dec-tt"
            value={decimals}
            onChange={(e) => setDecimals(e.target.value)}
          />
        </div>
      </div>
      <Button
        className="mt-4"
        disabled={busy || !wallet.connected}
        onClick={onTransfer}
      >
        {busy ? "Sending…" : "Transfer"}
      </Button>
      {log ? (
        <p className="mt-3 break-all font-mono text-xs text-accent">{log}</p>
      ) : null}
    </Card>
  );
}
