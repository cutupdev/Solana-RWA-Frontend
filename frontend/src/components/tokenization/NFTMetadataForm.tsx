"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";

export function NFTMetadataForm() {
  const [name, setName] = useState("RWA Certificate #1");
  const [symbol, setSymbol] = useState("RWAC");
  const [uri, setUri] = useState("https://example.com/metadata.json");
  const [collection, setCollection] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  function buildJson() {
    const obj = {
      name,
      symbol,
      description: "Real-world asset attestation / certificate",
      image: "https://example.com/image.png",
      attributes: [
        { trait_type: "Asset class", value: "Real estate" },
        { trait_type: "Jurisdiction", value: "US" },
      ],
      properties: {
        category: "image",
        ...(collection
          ? { collection: { name: collection, family: collection } }
          : {}),
      },
      external_url: uri,
    };
    setPreview(JSON.stringify(obj, null, 2));
  }

  return (
    <Card title="NFT-style certificate (metadata)">
      <p className="mb-4 text-sm text-zinc-400">
        Draft Metaplex-compatible JSON for a unique RWA certificate. Upload the
        JSON to your CDN or Arweave, then mint via your program or Metaplex Umi
        flow using the resulting URI.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div>
            <Label htmlFor="nft-name">Name</Label>
            <Input
              id="nft-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="nft-symbol">Symbol</Label>
            <Input
              id="nft-symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="nft-uri">Metadata URI (after upload)</Label>
            <Input
              id="nft-uri"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="nft-collection">Collection name (optional)</Label>
            <Input
              id="nft-collection"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
            />
          </div>
          <Button type="button" onClick={buildJson}>
            Generate JSON preview
          </Button>
        </div>
        <div>
          <Label>Preview</Label>
          <pre className="mt-1 max-h-80 overflow-auto rounded-lg border border-surface-border bg-surface p-3 text-xs text-zinc-300">
            {preview || "// Click generate"}
          </pre>
        </div>
      </div>
    </Card>
  );
}
