export interface JupiterQuoteParams {
  inputMint: string;
  outputMint: string;
  amount: string;
  slippageBps?: number;
}

export interface JupiterQuoteResponse {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  priceImpactPct?: string;
}

/**
 * Fetches a single-route quote from Jupiter v6 API.
 * Requires valid mint addresses for the active cluster.
 */
export async function fetchJupiterQuote(
  params: JupiterQuoteParams
): Promise<JupiterQuoteResponse> {
  const url = new URL(
    "/api/jupiter/quote",
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000"
  );
  url.searchParams.set("inputMint", params.inputMint);
  url.searchParams.set("outputMint", params.outputMint);
  url.searchParams.set("amount", params.amount);
  url.searchParams.set(
    "slippageBps",
    String(params.slippageBps ?? 50)
  );

  const res = await fetch(url.toString(), { method: "GET" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jupiter quote failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<JupiterQuoteResponse>;
}
