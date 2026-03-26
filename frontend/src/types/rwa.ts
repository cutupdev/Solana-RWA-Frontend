export type SolanaCluster = "mainnet-beta" | "devnet" | "testnet" | "localnet";

export interface RwaAssetSummary {
  id: string;
  name: string;
  symbol: string;
  mint: string;
  type: "fungible" | "nft";
  decimals: number;
  jurisdiction?: string;
  updatedAt: string;
}

export interface OrderDraft {
  id: string;
  side: "buy" | "sell";
  price: number;
  size: number;
  createdAt: string;
}

export interface ChartCandle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ProgramAccountField {
  pubkey: string;
  isSigner: boolean;
  isWritable: boolean;
}
