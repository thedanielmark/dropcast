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
    vaultAddress: "0xe92C2510fd0d1B3bA3ee57F16C1CFD572CBBEC58",
    chainlinkSelector: "10344971235874465080",
    ccipRouter: "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93",
    coreAddress: "0xa8ec309E062b0B986284c19a7A14AE2F1f4D4D0F",
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
    vaultAddress: "0x14260251f1640323677E7eBc1d6EcDC6D407d212",
    chainlinkSelector: "3478487238524512106",
    ccipRouter: "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165",
    crosschain: "0x7933194237b2A301E82bEd5916659c3Fda5352CA",
  },
};

module.exports = {
  networks,
};
