import Link from "next/link";
import { ClusterBanner } from "@/components/dashboard/ClusterBanner";
import { Card } from "@/components/ui/Card";

const tiles = [
  {
    title: "Tokenize assets",
    body: "Spin up SPL mints for fractional RWA and draft NFT metadata for unique instruments.",
    href: "/tokenize",
  },
  {
    title: "Trade & chart",
    body: "Stage orders, pull Jupiter quotes, and visualize price/volume for your desk.",
    href: "/trade",
  },
  {
    title: "Program calls",
    body: "Send raw instructions to your deployed RWA program with full wallet review.",
    href: "/contract",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Real-world assets on Solana
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Frontend shell for RWA issuance, secondary liquidity workflows, and
          low-level program interaction. Wire your IDL, compliance layer, and
          data feeds behind these views.
        </p>
      </div>

      <ClusterBanner />

      <div className="grid gap-4 md:grid-cols-3">
        {tiles.map((t) => (
          <Card key={t.href} title={t.title}>
            <p className="mb-4 text-sm text-zinc-400">{t.body}</p>
            <Link
              href={t.href}
              className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-surface transition hover:bg-accent-muted sm:w-auto"
            >
              Open
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
