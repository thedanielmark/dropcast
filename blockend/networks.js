require("@chainlink/env-enc").config();

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 3;

const PRIVATE_KEY = process.env.TEST_PRIVATE_KEY;

const accounts = [];
if (PRIVATE_KEY) {
  accounts.push(PRIVATE_KEY);
}

const networks = {
  ethereumSepolia: {
    url:
      "https://eth-sepolia.g.alchemy.com/v2/" +
      process.env.ALCHEMY_API_KEY_SEPOLIA,
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.ETHERSCAN_API_KEY || "UNSET",
    chainId: 11155111,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
  },
  baseSepolia: {
    url:
      "https://base-sepolia.g.alchemy.com/v2/" +
      process.env.ALCHEMY_API_KEY_BASE,
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.BASESCAN_API_KEY || "UNSET",
    chainId: 84532,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    vaultAddress: "0x42Fd9Fa04446f8Fd98946bACdE3182647f623e5a",
    coreAddress: "0xd6eE404C086FC2B4702432EE32c5f36Ca3121c83",
    chainlinkSelector: "10344971235874465080",
    ccipRouter: "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93",
  },
  arbitrumSepolia: {
    url:
      "https://arb-sepolia.g.alchemy.com/v2/" +
      process.env.ALCHEMY_API_KEY_BASE,
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.ARBISCAN_API_KEY || "UNSET",
    chainId: 421614,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    vaultAddress: "0xb2E569D1a8De5E127F36d91fd9Ca5371cc1eAe75",
    chainlinkSelector: "3478487238524512106",
    ccipRouter: "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165",
    crosschain: "0x3633e5F44b62fBF534aADD53675045973e3dfE43",
  },
};

module.exports = {
  networks,
};
