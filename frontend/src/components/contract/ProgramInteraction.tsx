"use client";

import { useState } from "react";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { getRwaProgramId } from "@/lib/solana/constants";
import { buildV0Tx } from "@/lib/solana/rwa-instructions";

function parseInstructionData(
  mode: "hex" | "utf8",
  raw: string
): Buffer {
  const trimmed = raw.trim();
  if (!trimmed) return Buffer.alloc(0);
  if (mode === "utf8") return Buffer.from(trimmed, "utf8");
  const hex = trimmed.replace(/^0x/i, "").replace(/\s+/g, "");
  if (hex.length % 2 !== 0) throw new Error("Hex length must be even.");
  return Buffer.from(hex, "hex");
}

export function ProgramInteraction() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const defaultProgram = getRwaProgramId();

  const [programIdStr, setProgramIdStr] = useState(
    defaultProgram?.toBase58() ?? ""
  );
  const [dataMode, setDataMode] = useState<"hex" | "utf8">("hex");
  const [dataRaw, setDataRaw] = useState("");
  const [accountsRaw, setAccountsRaw] = useState(
    `{"pubkey":"11111111111111111111111111111111","isSigner":true,"isWritable":true}`
  );
  const [log, setLog] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function sendInstruction() {
    setLog(null);
    if (!wallet.publicKey || !wallet.sendTransaction) {
      setLog("Connect a wallet that can send transactions.");
      return;
    }
    let programId: PublicKey;
    try {
      programId = new PublicKey(programIdStr.trim());
    } catch {
      setLog("Invalid program id.");
      return;
    }

    let accountsJson: {
      pubkey: string;
      isSigner: boolean;
      isWritable: boolean;
    }[];
    try {
      const parsed = JSON.parse(accountsRaw) as unknown;
      accountsJson = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      setLog("Accounts JSON must be an object or array of objects.");
      return;
    }

    const keys = accountsJson.map((a) => {
      try {
        return {
          pubkey: new PublicKey(a.pubkey),
          isSigner: Boolean(a.isSigner),
          isWritable: Boolean(a.isWritable),
        };
      } catch {
        throw new Error(`Bad pubkey: ${a.pubkey}`);
      }
    });

    let data: Buffer;
    try {
      data = parseInstructionData(dataMode, dataRaw);
    } catch (e) {
      setLog(e instanceof Error ? e.message : "Bad instruction data");
      return;
    }

    const ix = new TransactionInstruction({
      programId,
      keys,
      data,
    });

    setBusy(true);
    try {
      const bh = await connection.getLatestBlockhash();
      const txSingle = await buildV0Tx({
        payer: wallet.publicKey,
        recentBlockhash: bh.blockhash,
        instructions: [ix],
      });
      const sig = await wallet.sendTransaction(txSingle, connection, {
        skipPreflight: false,
      });
      await connection.confirmTransaction({
        signature: sig,
        blockhash: bh.blockhash,
        lastValidBlockHeight: bh.lastValidBlockHeight,
      });
      setLog(`Confirmed: ${sig}`);
    } catch (e) {
      setLog(e instanceof Error ? e.message : "Transaction failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card title="Custom instruction">
      <p className="mb-4 text-sm text-zinc-400">
        Build a raw instruction for your RWA program. Validate discriminators
        and account order against your IDL before signing.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="prog">Program id</Label>
          <Input
            id="prog"
            className="font-mono text-xs"
            value={programIdStr}
            onChange={(e) => setProgramIdStr(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={dataMode === "hex" ? "primary" : "ghost"}
            onClick={() => setDataMode("hex")}
          >
            Hex data
          </Button>
          <Button
            variant={dataMode === "utf8" ? "primary" : "ghost"}
            onClick={() => setDataMode("utf8")}
          >
            UTF-8 data
          </Button>
        </div>
        <div>
          <Label htmlFor="ixdata">Instruction data</Label>
          <Input
            id="ixdata"
            className="font-mono text-xs"
            value={dataRaw}
            onChange={(e) => setDataRaw(e.target.value)}
            placeholder={dataMode === "hex" ? "e.g. 0100000000000000" : "text"}
          />
        </div>
        <div>
          <Label htmlFor="accts">Accounts (JSON array or single object)</Label>
          <textarea
            id="accts"
            className="mt-1 min-h-[120px] w-full rounded-lg border border-surface-border bg-surface px-3 py-2 font-mono text-xs text-zinc-100 outline-none ring-accent/40 focus:ring-2"
            value={accountsRaw}
            onChange={(e) => setAccountsRaw(e.target.value)}
          />
        </div>
        <Button disabled={busy || !wallet.connected} onClick={sendInstruction}>
          {busy ? "Sending…" : "Sign & send"}
        </Button>
        {log ? (
          <p className="break-all font-mono text-xs text-accent">{log}</p>
        ) : null}
      </div>
    </Card>
  );
}
