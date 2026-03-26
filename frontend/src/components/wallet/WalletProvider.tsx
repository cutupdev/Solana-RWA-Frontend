"use client";

import { useMemo, ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BackpackWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, type Cluster } from "@solana/web3.js";
import { clusterToWeb3Cluster, getRpcEndpoint } from "@/lib/solana/cluster";
import type { SolanaCluster } from "@/types/rwa";

import "@solana/wallet-adapter-react-ui/styles.css";

export function WalletProvider({
  children,
  cluster,
}: {
  children: ReactNode;
  cluster: SolanaCluster;
}) {
  const endpoint = useMemo(() => getRpcEndpoint(cluster), [cluster]);

  const wallets = useMemo(() => {
    const net = clusterToWeb3Cluster(cluster);
    const solflareNetwork: Cluster =
      net === "localnet" ? "devnet" : net;
    return [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network: clusterApiUrl(solflareNetwork) }),
      new BackpackWalletAdapter(),
    ];
  }, [cluster]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
