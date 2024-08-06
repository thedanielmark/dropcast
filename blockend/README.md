# Dropify Contracts

Contracts for Dropify.

## Tech

1. Chainlink and Hyperlane
    a. Cross Chain Transactions
2. EAS
    a. On-chain verifiable attestations.
3. Worldcoin
    a. Proof of humaness
5. Optimism, Base, Metal L2, Ethereum, Arbitrum, Avalanche, Polygon
    a. Deployments
6. Goldsky
    a. Indexing
7. Farcaster
    a. Social verification
    b. Composer Actions
    c. Frames

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

1. Deploy Vault Implementation
2. Deploy Crosschain contracts
3. Deploy Core
4. Initialize Crosschain Contracts with core

## Contributors

- Gabriel - Blockchain Engineer & Architect

## License

This monorepo is licensed under the [MIT License](LICENSE).
