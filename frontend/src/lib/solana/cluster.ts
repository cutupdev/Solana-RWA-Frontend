import { clusterApiUrl, Connection, Cluster } from "@solana/web3.js";
import type { SolanaCluster } from "@/types/rwa";

export function parseCluster(value: string | undefined): SolanaCluster {
  const v = (value || "devnet").toLowerCase();
  if (
    v === "mainnet-beta" ||
    v === "devnet" ||
    v === "testnet" ||
    v === "localnet"
  ) {
    return v;
  }
  return "devnet";
}

export function clusterToWeb3Cluster(cluster: SolanaCluster): Cluster | "localnet" {
  if (cluster === "localnet") return "localnet";
  return cluster;
}

export function getRpcEndpoint(cluster: SolanaCluster): string {
  const custom = process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.trim();
  if (custom) return custom;
  if (cluster === "localnet") return "http://127.0.0.1:8899";
  return clusterApiUrl(cluster);
}

export function createConnection(cluster: SolanaCluster): Connection {
  return new Connection(getRpcEndpoint(cluster), {
    commitment: "confirmed",
  });
}
