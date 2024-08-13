# Dropify

This is a monorepo containing the front-end and contracts for Dropify.

## Projects

- App: Next.js font-end application.
- Contracts: Smart contracts on Base.

## Problem

**Airdrop Scams on X:** Social platforms, especially Twitter, are flooded with airdrop promotions, many of which are scams that distribute malicious links and exploit users.

**Victimization of Users:** A significant number of users fall prey to these scams, compromising their security and losing funds due to the deceptive nature of these airdrops.

**Secure Airdrops?:** Existing social media platforms lack a secure and reliable protocol for conducting legitimate airdrops, leaving users exposed to fraud.

## Description


**On-chain Attestations with EAS:** Each airdrop and claim is verified on-chain through Ethereum Attestation Service (EAS), providing transparency and trustworthiness to the process.

**Sybil-proofing with Worldcoin:** Dropcast ensures a secure airdrop process by leveraging Worldcoin to prevent sybil attacks, ensuring that each airdrop is distributed fairly and securely.

**Cross-chain via Chainlink CCIP:** Dropcast supports cross-chain airdrops using Chainlink CCIP, enabling seamless and secure transactions across different blockchain networks.

# Worldcoin

1. IDKitWidget - https://github.com/thedanielmark/dropcast/blob/app/app/app/components/ClaimAirdrop.tsx
2. On chain Verification - https://github.com/thedanielmark/dropcast/blob/app/blockend/contracts/DropifyCore.sol
3. Deployed contract - https://base-sepolia.blockscout.com/address/0xEf942B3B34d0A3534CC8EeB25Bce5AB5395A475f#code 

# EAS

1. Attestation Implementation - https://github.com/thedanielmark/dropcast/blob/app/blockend/contracts/DropifyCore.sol#L124
2. Smart contract Deployment - https://github.com/thedanielmark/dropcast/blob/app/blockend/networks.js#L39
3. Create Airdrop Schema - https://base-sepolia.easscan.org/schema/view/0xa47b91299da9a0bd968e0030568703a00ad0d851bd9c32efb98a53e39750ed42
4. Claim Airdrop Schema - https://base-sepolia.easscan.org/schema/view/0x82ba92089cfdf9cd4340c24b35356aabf92e5bac94f264af89e060cb4896bbcd

# Base

1. Deployed Core Contract - https://base-sepolia.blockscout.com/address/0xEf942B3B34d0A3534CC8EeB25Bce5AB5395A475f#code 

# Blockscout

1. Dropcast Core - https://base-sepolia.blockscout.com/address/0xEf942B3B34d0A3534CC8EeB25Bce5AB5395A475f#code
2. Dropcast Crosschain - https://sepolia-explorer.arbitrum.io/address/0x46028135B5d373E6a826fB532adF1ADc6A7659d2#code

# Chainlink

1. CCIP Implementation 1 - https://github.com/thedanielmark/dropcast/blob/app/blockend/contracts/DropifyCore.sol#L158
2. CCIP Implementation 2 - https://github.com/thedanielmark/dropcast/blob/app/blockend/contracts/DropifyCrosschain.sol#L117
3. Deployed Contract 1 - https://base-sepolia.blockscout.com/address/0xEf942B3B34d0A3534CC8EeB25Bce5AB5395A475f#code
4. Deployed Contract 2 - https://sepolia-explorer.arbitrum.io/address/0x46028135B5d373E6a826fB532adF1ADc6A7659d2#code

# Goldsky

1. Subgraph config - https://github.com/thedanielmark/dropcast/blob/app/subgraph/gb-config.json
2. Subgraph deployment - 

# Farcaster

1. Composer Action Implementation - https://github.com/thedanielmark/dropcast/blob/app/app/app/api/%5B%5B...routes%5D%5D/route.tsx
2. Frames Implementation - https://github.com/thedanielmark/dropcast/blob/app/app/app/api/%5B%5B...routes%5D%5D/route.tsx

# Alchemy

1. AccountKit Integration -https://github.com/thedanielmark/dropcast/blob/app/app/app/providers.tsx
2. Sample Write Call - https://github.com/thedanielmark/dropcast/blob/app/app/app/components/ClaimAirdrop.tsx#L117
3. Sample Read Call - https://github.com/thedanielmark/dropcast/blob/app/app/app/components/ClaimAirdrop.tsx#L152

## Gabriel Tasks

1. Complete and Depoly Mocks - DONE
2. Add test scripts and buttons in FE - DONE
3. Add worldcoin verification in frontend - DONE
4. Test Chainlink CCIP - DONE
5. Test EAS attestations and implement Vaults - DONE
6. Test Full flow for all chains - DONE

## Daniel Tasks

1. Frontend
2. Goldsky

## Contributors

- Daniel Mark - Full-Stack Engineer & Product Designer
- Gabriel - Blockchain Engineer & Architect

## License

This monorepo is licensed under the [MIT License](LICENSE).
