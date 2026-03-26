import type { ChartCandle } from "@/types/rwa";

export function generateSampleCandles(points = 48, base = 1.02): ChartCandle[] {
  const out: ChartCandle[] = [];
  let price = base;
  const now = Date.now();
  for (let i = points - 1; i >= 0; i--) {
    const drift = (Math.random() - 0.48) * 0.04;
    const open = price;
    const close = Math.max(0.05, open * (1 + drift));
    const high = Math.max(open, close) * (1 + Math.random() * 0.02);
    const low = Math.min(open, close) * (1 - Math.random() * 0.02);
    const volume = Math.round(5000 + Math.random() * 25000);
    out.push({
      time: new Date(now - i * 3600_000).toISOString(),
      open,
      high,
      low,
      close,
      volume,
    });
    price = close;
  }
  return out;
}
