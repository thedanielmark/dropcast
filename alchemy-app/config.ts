import {
  AlchemyAccountsUIConfig,
  cookieStorage,
  createConfig,
} from "@account-kit/react";
import { mainnet, sepolia } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [[{ type: "email" as const }], [{ type: "passkey" as const }]],
    addPasskeyOnSignup: false,
  },
};

export const config = createConfig(
  {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
    chain: sepolia,
    chains: [
      {
        chain: mainnet, // optional: you can specify a policy ID for this chain, if you want to sponsor gas
        policyId: "MAINNET_GAS_MANAGER_POLICY_ID",
      },
      {
        chain: sepolia,
        // optional: you can specify a policy ID for this chain, if you want to sponsor gas
        policyId: "SEPOLIA_GAS_MANAGER_POLICY_ID",
      },
    ],
    ssr: true, // defers hydration of the account state to the client after the initial mount solving any inconsistencies between server and client state (read more here: https://accountkit.alchemy.com/react/ssr)
    storage: cookieStorage, // persist the account state using cookies (read more here: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state)
  },
  uiConfig
);

export const queryClient = new QueryClient();
