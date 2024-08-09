# Dropify Contracts

Contracts for Dropify.

## Tech

1. Chainlink and Hyperlane
   a. Cross Chain Transactions
2. EAS
   a. On-chain verifiable attestations.
3. Worldcoin
   a. Proof of humaness
4. Optimism, Base, Metal L2, Ethereum, Arbitrum, Avalanche, Polygon
   a. Deployments
5. Goldsky
   a. Indexing
6. Farcaster
   a. Social verification
   b. Composer Actions
   c. Frames

## Metadata Schema

1. Title: Title of the airdrop
2. Description: Description of the airdrop in Markdown
3. Tasks: An array of tasks to complete to claim the airdrop
   1. Type: In the UI, it should be dropdown where the user chooses from a list of the below options
      1. Hold NFTs: Type 1. Address = NFT contract address. Threshold = required number of NFTs in that collection to claim the airdrop.
      2. Hold ERC20s: Type 2. Address = ERC20 contract address. Threshold = required number of tokens to claim the airdrop.
      3. Follow Account in Farcaster. type 3. Address = Does not matter. Threshold = fid that needs to be followed.
      4. Followers Criteria. Type 4. Address= Does not matter. threshold = amount of followers required.
   2. Address: Address of the token for NFTs and ERC20s. Depends on the type for the others.
   3. Threshold: Required amount to satisfy the criteria.

## Contract Specification

1. Create airdrop (should be done on the respective chain)
   1. Send native value to our EOA to sponsor gas
   2. Transfer tokens of the airdrop (needs to verify if the tokens are already approved)
   3. Tasks (These are structured data stored in IPFS)
      1. Own Token (NFT or ERC20)
      2. Follow Farcaster account
      3. Have minimum Farcaster followers criteria
   4. Send crosschain transaction to base (only for chains other than base)
   5. Send funds to a vault
2. Claim airdrop (give required signatures, and world id proof)
   1. Verify world id proof
   2. Make other verifications off-chain and allow call to this function only by an authorized EOA
   3. Makes on chain attestation
   4. If cross chain, send a cross chain transaction

## Deploy Order

1. Deploy Vault Implementation on all chains
2. Deploy Crosschain contracts on all chains (except base)
3. Deploy Core (on base)
4. Initialize Core with crosschain contracts

## EAS Schemas

1. Create Airdrop - https://base-sepolia.easscan.org/schema/view/0xa47b91299da9a0bd968e0030568703a00ad0d851bd9c32efb98a53e39750ed42
2. Claim Airdrop - https://base-sepolia.easscan.org/schema/view/0x82ba92089cfdf9cd4340c24b35356aabf92e5bac94f264af89e060cb4896bbcd

## Deploy Commands

yarn hardhat deploy-vault --verify true --network baseSepolia
yarn hardhat deploy-vault --verify true --network arbitrumSepolia
yarn hardhat deploy-core --verify true --network baseSepolia
yarn hardhat deploy-crosschain --verify true --network arbitrumSepolia

## Deployments

1. Vault Implementation (Base) - 0x7c249c42CF87deCf9f424FcBb851397599C3073E
2. Vault Implementation (Arbitrum) - 0xC7297019FCDA5774c22180cd7E1801fed7EC10A9
3. Core Mock (Base) - 0xB08aDb11A45284b96155F63009758014b1eb698C
4. Crosschain Mock (Arbitrum) - 0x4a0DC91781A116e83770A17AD09b63fa3E50d7Ce
5. Core (Base) - 0x6948d04F773C3045Ed10956d0638aEd64e6e30E7

## Tasks

1. Chainlink Create Airdrop
2. Claim Airdrop
3. Crosschain Claim Airdrop
4. Hyperlane (if time permits)

## Contributors

- Gabriel - Blockchain Engineer & Architect

## License

This monorepo is licensed under the [MIT License](LICENSE).
