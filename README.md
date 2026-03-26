# Solana RWA Frontend

A Next.js dashboard for **real-world asset (RWA) tokenization** on Solana: SPL tokens, NFT-style certificates, a trading workspace with charts, and a panel to build and send transactions to your on-chain program.

## Features

- **Wallet**: Solana Wallet Adapter (Phantom, Solflare, Backpack, etc.) with cluster switching.
- **Tokenization**: Create SPL mints (devnet-friendly flow) and mint NFT metadata (Metaplex-style URI + collection fields in the UI; wire to your program or Token-2022 as needed).
- **Trading**: Place mock limit/market-style orders in local state, Jupiter quote via same-origin API proxy (`/api/jupiter/quote`), and a price/volume chart (sample series).
- **Smart contract**: Encode custom instruction data (hex or UTF-8), attach accounts with signer/writable flags, preview and sign with the connected wallet.

## Repository layout

| Path | Purpose |
|------|---------|
| `frontend/` | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| `.env.example` | Environment template (copy values into `frontend/.env.local`) |

## Prerequisites

- Node.js 18+
- A Solana wallet with devnet SOL for testing
- (Optional) Deployed RWA Anchor/native program and its program id

## Setup

1. Copy environment file:

   ```bash
   cp .env.example frontend/.env.local
   ```

   Edit `frontend/.env.local` and set `NEXT_PUBLIC_RWA_PROGRAM_ID` after deployment.

2. Install and run (when you are ready on your machine):

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Security notes

- Never commit `.env.local` or private keys.
- Review every transaction in your wallet before signing.
- Production should use a dedicated RPC provider and your own Jupiter / indexer endpoints if required.

## Customizing on-chain integration

- Replace placeholder instruction discriminators and account metas in `frontend/src/lib/solana/rwa-instructions.ts` with IDs from your IDL or program source.
- Point `NEXT_PUBLIC_RWA_PROGRAM_ID` at your deployed program.
- For production NFT/token standards, align forms with Metaplex Token Metadata, Token-2022 extensions, or your RWA registry program.

## Contact Information
- Telegram: https://t.me/DevCutup
- Twitter: https://x.com/devcutup
