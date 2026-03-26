"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import type { OrderDraft } from "@/types/rwa";
import { fetchJupiterQuote } from "@/lib/jupiter/quote";

function newId() {
  return `ord-${Math.random().toString(36).slice(2, 10)}`;
}

export function TradingPanel() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("1.05");
  const [size, setSize] = useState("100");
  const [orders, setOrders] = useState<OrderDraft[]>([]);
  const [jupInput, setJupInput] = useState(
    "So11111111111111111111111111111111111111112"
  );
  const [jupOutput, setJupOutput] = useState(
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  );
  const [jupAmount, setJupAmount] = useState("100000000");
  const [quoteMsg, setQuoteMsg] = useState<string | null>(null);
  const [quoteBusy, setQuoteBusy] = useState(false);

  const sorted = useMemo(
    () => [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [orders]
  );

  function addOrder() {
    const p = Number(price);
    const s = Number(size);
    if (!Number.isFinite(p) || !Number.isFinite(s) || p <= 0 || s <= 0) return;
    const draft: OrderDraft = {
      id: newId(),
      side,
      price: p,
      size: s,
      createdAt: new Date().toISOString(),
    };
    setOrders((o) => [draft, ...o]);
  }

  async function loadQuote() {
    setQuoteMsg(null);
    setQuoteBusy(true);
    try {
      const q = await fetchJupiterQuote({
        inputMint: jupInput.trim(),
        outputMint: jupOutput.trim(),
        amount: jupAmount.trim(),
      });
      setQuoteMsg(
        `Out: ${q.outAmount} (impact ${q.priceImpactPct ?? "n/a"}%)`
      );
    } catch (e) {
      setQuoteMsg(e instanceof Error ? e.message : "Quote failed");
    } finally {
      setQuoteBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Order pad (simulated)">
        <p className="mb-4 text-sm text-zinc-400">
          Captures intent for UI/UX. Connect to your matching engine, AMM, or
          Jupiter swap transaction builder.
        </p>
        <div className="mb-4 flex gap-2">
          <Button
            variant={side === "buy" ? "primary" : "ghost"}
            onClick={() => setSide("buy")}
          >
            Buy
          </Button>
          <Button
            variant={side === "sell" ? "danger" : "ghost"}
            onClick={() => setSide("sell")}
          >
            Sell
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="px">Limit price</Label>
            <Input
              id="px"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="sz">Size</Label>
            <Input
              id="sz"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
        </div>
        <Button className="mt-4" onClick={addOrder}>
          Stage order
        </Button>
      </Card>

      <Card title="Jupiter quote (read-only)">
        <p className="mb-4 text-sm text-zinc-400">
          Pulls a quote from the public API. Mints must exist on the cluster
          Jupiter indexes.
        </p>
        <div className="space-y-3">
          <div>
            <Label htmlFor="in-mint">Input mint</Label>
            <Input
              id="in-mint"
              className="font-mono text-xs"
              value={jupInput}
              onChange={(e) => setJupInput(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="out-mint">Output mint</Label>
            <Input
              id="out-mint"
              className="font-mono text-xs"
              value={jupOutput}
              onChange={(e) => setJupOutput(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="amt">Amount (raw, smallest units)</Label>
            <Input
              id="amt"
              value={jupAmount}
              onChange={(e) => setJupAmount(e.target.value)}
            />
          </div>
          <Button disabled={quoteBusy} onClick={loadQuote}>
            {quoteBusy ? "Loading…" : "Get quote"}
          </Button>
          {quoteMsg ? (
            <p className="break-words text-xs text-accent">{quoteMsg}</p>
          ) : null}
        </div>
      </Card>

      <Card title="Staged orders" className="lg:col-span-2">
        {sorted.length === 0 ? (
          <p className="text-sm text-zinc-500">No staged orders yet.</p>
        ) : (
          <ul className="divide-y divide-surface-border text-sm">
            {sorted.map((o) => (
              <li
                key={o.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <span
                  className={
                    o.side === "buy" ? "text-accent" : "text-red-400"
                  }
                >
                  {o.side.toUpperCase()}
                </span>
                <span>
                  {o.size} @ {o.price}
                </span>
                <span className="text-xs text-zinc-500">{o.createdAt}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
