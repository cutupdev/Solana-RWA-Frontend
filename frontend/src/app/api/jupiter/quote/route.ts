import { NextRequest, NextResponse } from "next/server";
import { JUPITER_QUOTE_API } from "@/lib/solana/constants";

export async function GET(req: NextRequest) {
  const upstream = new URL(`${JUPITER_QUOTE_API}/quote`);
  req.nextUrl.searchParams.forEach((value, key) => {
    upstream.searchParams.set(key, value);
  });

  const res = await fetch(upstream.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
  });

  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
