import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { arbitrumSepolia, baseSepolia } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [{ type: "passkey" }, { type: "injected" }],
    ],
    addPasskeyOnSignup: true,
  },
};

export const config = createConfig(
  {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
    chain: baseSepolia,
    // chains: [baseSepolia, arbitrumSepolia],
    ssr: true,
  },
  uiConfig
);

export const queryClient = new QueryClient();
