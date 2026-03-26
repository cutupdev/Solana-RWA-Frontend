import { TokenMintForm } from "@/components/tokenization/TokenMintForm";
import { NFTMetadataForm } from "@/components/tokenization/NFTMetadataForm";
import { AssetRegistry } from "@/components/tokenization/AssetRegistry";
import { TokenTransferPanel } from "@/components/tokenization/TokenTransferPanel";
import { ComplianceStrip } from "@/components/rwa/ComplianceStrip";

export default function TokenizePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Tokenization</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Fungible mints for fractional pools and NFT metadata for
          asset-specific certificates.
        </p>
      </div>
      <ComplianceStrip />
      <div className="grid gap-6 lg:grid-cols-2">
        <TokenMintForm />
        <NFTMetadataForm />
      </div>
      <TokenTransferPanel />
      <AssetRegistry />
    </div>
  );
}
