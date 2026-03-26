"use client";

import { useMemo } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartCandle } from "@/types/rwa";
import { Card } from "@/components/ui/Card";

function formatTime(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:00`;
}

export function PriceChart({ data }: { data: ChartCandle[] }) {
  const chartData = useMemo(
    () =>
      data.map((c) => ({
        ...c,
        label: formatTime(c.time),
        volK: Math.round(c.volume / 1000),
      })),
    [data]
  );

  return (
    <Card title="Price & volume">
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid stroke="#30363d" strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fill: "#8b949e", fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="price"
              tick={{ fill: "#8b949e", fontSize: 10 }}
              domain={["auto", "auto"]}
              width={48}
            />
            <YAxis
              yAxisId="vol"
              orientation="right"
              tick={{ fill: "#8b949e", fontSize: 10 }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                background: "#161b22",
                border: "1px solid #30363d",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "#e6edf3" }}
            />
            <Area
              yAxisId="price"
              type="monotone"
              dataKey="close"
              stroke="#14f195"
              fill="#14f19533"
              name="Close"
            />
            <Bar
              yAxisId="vol"
              dataKey="volK"
              fill="#3b4f6b"
              name="Volume (k)"
              barSize={6}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Sample hourly series for layout. Pipe in oracle or DEX candles from your
        backend.
      </p>
    </Card>
  );
}
