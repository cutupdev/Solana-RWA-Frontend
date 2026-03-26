"use client";

import { ReactNode } from "react";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { AppShell } from "@/components/layout/AppShell";
import { DEFAULT_CLUSTER } from "@/lib/solana/constants";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletProvider cluster={DEFAULT_CLUSTER}>
      <AppShell>{children}</AppShell>
    </WalletProvider>
  );
}
