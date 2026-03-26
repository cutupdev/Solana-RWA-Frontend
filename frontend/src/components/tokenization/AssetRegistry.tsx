"use client";

import { useEffect, useState } from "react";
import type { RwaAssetSummary } from "@/types/rwa";
import { Card } from "@/components/ui/Card";

const STORAGE_KEY = "rwa-local-registry";

const seed: RwaAssetSummary[] = [
  {
    id: "demo-1",
    name: "Warehouse Receipt SPV",
    symbol: "WH-01",
    mint: "So11111111111111111111111111111111111111112",
    type: "fungible",
    decimals: 6,
    jurisdiction: "US",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Commercial deed NFT",
    symbol: "DEED-NYC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    type: "nft",
    decimals: 0,
    jurisdiction: "US",
    updatedAt: new Date().toISOString(),
  },
];

export function AssetRegistry() {
  const [assets, setAssets] = useState<RwaAssetSummary[]>(seed);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as RwaAssetSummary[];
        if (Array.isArray(parsed) && parsed.length) setAssets(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <Card title="Registry (local)">
      <p className="mb-4 text-sm text-zinc-400">
        Placeholder list for UX wiring. Replace with your indexer or on-chain
        account deserialization.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-surface-border text-xs uppercase text-zinc-500">
            <tr>
              <th className="pb-2 pr-4">Name</th>
              <th className="pb-2 pr-4">Type</th>
              <th className="pb-2 pr-4">Mint</th>
              <th className="pb-2">Jurisdiction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {assets.map((a) => (
              <tr key={a.id} className="text-zinc-300">
                <td className="py-3 pr-4">
                  <div className="font-medium text-white">{a.name}</div>
                  <div className="text-xs text-zinc-500">{a.symbol}</div>
                </td>
                <td className="pr-4 capitalize">{a.type}</td>
                <td className="max-w-[200px] truncate pr-4 font-mono text-xs">
                  {a.mint}
                </td>
                <td>{a.jurisdiction ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
