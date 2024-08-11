import { config } from "@/config";
import { cookieToInitialState } from "@account-kit/core";
import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "DropCast",
  description:
    "Cross-chain and sybil-proof airdrop protocol in Farcaster using Composer Actions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This will allow us to persist state across page boundaries (read more here: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state)
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined
  );

  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <body className="bg-zinc-900 text-white">
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
