export const CORE_ADDRESS = "0xB08aDb11A45284b96155F63009758014b1eb698C";
export const CROSSCHAIN_ADDRESSES = {
  421614: "0x4a0DC91781A116e83770A17AD09b63fa3E50d7Ce",
};

export const CORE_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "vaultImplementation",
            type: "address",
          },
          {
            internalType: "address",
            name: "ccipRouter",
            type: "address",
          },
          {
            internalType: "address",
            name: "hyperlaneRouter",
            type: "address",
          },
        ],
        internalType: "struct DropifyCoreMock.ConstructorParams",
        name: "_params",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "NotOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "airdropId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "claimerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountClaimed",
        type: "uint256",
      },
    ],
    name: "AidropClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "airdropId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "chain",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "vaultAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokensPerClaim",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "AirdropCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "CHAIN",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "aidropIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "airdrops",
    outputs: [
      {
        internalType: "uint256",
        name: "localAirdropId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokensPerClaim",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokensClaimed",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "vaultAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "createdAttestationId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ccipRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "chainlinkCcipDeployments",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "airdropId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "claimerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountClaimed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "nullifier",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "proof",
            type: "bytes",
          },
        ],
        internalType: "struct DropifyCoreMock.Humanness",
        name: "humanness",
        type: "tuple",
      },
    ],
    name: "claimAirdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokensPerClaim",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
        ],
        internalType: "struct DropifyCoreMock.CreateAirdropParams",
        name: "params",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "createdAttestationId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "vaultAddress",
            type: "address",
          },
        ],
        internalType: "struct DropifyCoreMock.MockParams",
        name: "mockParams",
        type: "tuple",
      },
    ],
    name: "createAirdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "hyperlaneDeployments",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hyperlaneRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_hyperlaneAddresses",
        type: "address[]",
      },
      {
        internalType: "uint64[]",
        name: "_hyperlaneSelectors",
        type: "uint64[]",
      },
      {
        internalType: "address[]",
        name: "_chainlinkAddresses",
        type: "address[]",
      },
      {
        internalType: "uint64[]",
        name: "_chainlinkSelectors",
        type: "uint64[]",
      },
    ],
    name: "initalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "localAirdropIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nullifiers",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "crossChainAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isChainlink",
        type: "bool",
      },
      {
        internalType: "uint64",
        name: "_chain",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "localAirdropId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokensPerClaim",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "vaultAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
        ],
        internalType: "struct DropifyCoreMock.CrosshchainCreateAirdropParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "receiveCreateAirdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vaultImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const CROSSCHAIN_ABI = [
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_chain",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "_coreAddress",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_coreSelector",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "chain",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "NotAuthorizedCrosschain",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "airdropId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "claimerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "claimAttestaionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountClaimed",
        type: "uint256",
      },
    ],
    name: "AidropClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "localAirdropId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "crosschainMessageId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "vaultAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokensPerClaim",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "AirdropCrosschainCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "aidropIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "airdrops",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokensPerClaim",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokensClaimed",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "vaultAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "createdAttestationId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "chain",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "coreAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "coreHyperlaneSelector",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "coreSelector",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokensPerClaim",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
        ],
        internalType: "struct DropifyCrosschainMock.CreateAirdropParams",
        name: "params",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "crosschainMessageId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "createdAttestationId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "vaultAddress",
            type: "address",
          },
        ],
        internalType: "struct DropifyCrosschainMock.MockParams",
        name: "mockParams",
        type: "tuple",
      },
    ],
    name: "createAirdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nullifiers",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_caller",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_chain",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "localAirdropId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "claimer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "claimAttestationId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nullifer",
            type: "uint256",
          },
        ],
        internalType: "struct DropifyCrosschainMock.CrosschainClaimParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "receiveClaimAirdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
