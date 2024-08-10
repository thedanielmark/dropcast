export const CORE_ADDRESS = "0xa8ec309E062b0B986284c19a7A14AE2F1f4D4D0F";
export const CROSSCHAIN_ADDRESSES = {
  421614: "0x7933194237b2A301E82bEd5916659c3Fda5352CA",
};

export const CORE_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "chainId",
            type: "uint64",
          },
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
          {
            internalType: "contract IEAS",
            name: "eas",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "createAirdropSchema",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "claimAirdropSchema",
            type: "bytes32",
          },
          {
            internalType: "contract IWorldID",
            name: "worldId",
            type: "address",
          },
          {
            internalType: "string",
            name: "appId",
            type: "string",
          },
          {
            internalType: "string",
            name: "action",
            type: "string",
          },
        ],
        internalType: "struct DropifyCore.ConstructorParams",
        name: "_params",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Create2EmptyBytecode",
    type: "error",
  },
  {
    inputs: [],
    name: "Create2FailedDeployment",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "Create2InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "airdropId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
    ],
    name: "HumanAlreadyClaimed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "airdropId",
        type: "uint256",
      },
    ],
    name: "InvalidAirdropId",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEAS",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "InvalidRouter",
    type: "error",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "NotEnoughAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "NotEnoughCrosschainFee",
    type: "error",
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
    inputs: [
      {
        internalType: "uint256",
        name: "airdropId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokensClaimed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokensPerClaim",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "VaultDepleted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vaultAddress",
        type: "address",
      },
    ],
    name: "VaultInitFailed",
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
        internalType: "bytes32",
        name: "claimAttestationId",
        type: "bytes32",
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
    name: "AirdropClaimed",
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
        internalType: "uint256",
        name: "localAirdropId",
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
        internalType: "bytes32",
        name: "attestationId",
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
    name: "AirdropCreated",
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
        name: "chainId",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "crosschainMessageId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "claimAttestationId",
        type: "bytes32",
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
    name: "AirdropCrosschainClaimed",
    type: "event",
  },
  {
    inputs: [],
    name: "INITIALIZE_VAULT_METHOD_ID",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
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
        internalType: "uint64",
        name: "chainId",
        type: "uint64",
      },
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
        internalType: "bytes32",
        name: "createdAttestationId",
        type: "bytes32",
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
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "chainId",
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
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "chainToSelectors",
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
        internalType: "uint256",
        name: "airdropId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "signal",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "root",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nullifier",
            type: "uint256",
          },
          {
            internalType: "uint256[8]",
            name: "proof",
            type: "uint256[8]",
          },
        ],
        internalType: "struct Humanness",
        name: "humanness",
        type: "tuple",
      },
    ],
    name: "claimAirdrop",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimAirdropSchema",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "struct CreateAirdropParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createAirdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "createAirdropSchema",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
    name: "crosschainDeployments",
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
        name: "_chainId",
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
            name: "nullifier",
            type: "uint256",
          },
        ],
        internalType: "struct CrosschainClaim",
        name: "params",
        type: "tuple",
      },
    ],
    name: "getFee",
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
    inputs: [],
    name: "getRouter",
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
        name: "_chainlinkAddresses",
        type: "address[]",
      },
      {
        internalType: "uint64[]",
        name: "_chainIds",
        type: "uint64[]",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
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
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "signal",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "root",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nullifier",
            type: "uint256",
          },
          {
            internalType: "uint256[8]",
            name: "proof",
            type: "uint256[8]",
          },
        ],
        internalType: "struct Humanness",
        name: "humanness",
        type: "tuple",
      },
    ],
    name: "verifyWorldProof",
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
];

export const CROSSCHAIN_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "chainId",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "coreChainId",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "coreAddress",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "coreSelector",
            type: "uint64",
          },
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
        ],
        internalType: "struct DropifyCrosschain.ConstructorParams",
        name: "params",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Create2EmptyBytecode",
    type: "error",
  },
  {
    inputs: [],
    name: "Create2FailedDeployment",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "Create2InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "airdropId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
    ],
    name: "HumanAlreadyClaimed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "InvalidRouter",
    type: "error",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "NotEnoughAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "NotEnoughCrosschainFee",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "airdropId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokensClaimed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokensPerClaim",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "VaultDepleted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vaultAddress",
        type: "address",
      },
    ],
    name: "VaultInitFailed",
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
    name: "INITIALIZE_VAULT_METHOD_ID",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
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
        internalType: "uint64",
        name: "chainId",
        type: "uint64",
      },
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
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipReceive",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "coreChain",
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
        internalType: "struct CreateAirdropParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createAirdrop",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "chainId",
            type: "uint64",
          },
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
        ],
        internalType: "struct CrosschainAirdrop",
        name: "params",
        type: "tuple",
      },
    ],
    name: "getFee",
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
    inputs: [],
    name: "getRouter",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
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
