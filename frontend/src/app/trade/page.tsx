"use client";

import { useMemo, useState } from "react";
import { TradingPanel } from "@/components/trading/TradingPanel";
import { PriceChart } from "@/components/trading/PriceChart";
import { generateSampleCandles } from "@/lib/chart/sample-candles";
import { Button } from "@/components/ui/Button";

export default function TradePage() {
  const [seed, setSeed] = useState(0);
  const data = useMemo(() => generateSampleCandles(48, 1.02 + seed * 0.01), [seed]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Trading desk</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Charts for storytelling; connect your market data feed for production.
          </p>
        </div>
        <Button variant="ghost" onClick={() => setSeed((s) => s + 1)}>
          Refresh sample series
        </Button>
      </div>
      <PriceChart data={data} />
      <TradingPanel />
    </div>
  );
}
