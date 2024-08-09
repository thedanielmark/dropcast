// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error NotOwner(address caller);
error WorldCoinVerificationFailed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);
error HumanAlreadyClaimed(uint256 airdropId, uint256 nullifierHash);
error NotEnoughCrosschainFee(uint256 balance, uint256 fee);
error NotAuthorizedCrosschain(uint64 chain, address caller);
error VaultInitFailed(address vaultAddress);
error NotEnoughAllowance(uint256 tokenAmount);
error InvalidEAS();
error InvalidAirdropId(uint256 airdropId);
error VaultDepleted(uint256 airdropId, uint256 tokensClaimed, uint256 tokensPerClaim, uint256 tokenAmount);

struct CreateAirdropParams {
    address tokenAddress;
    uint256 tokenAmount;
    uint256 tokensPerClaim;
    string metadata;
}

struct CrosshchainCreateAirdropParams {
    uint256 localAirdropId;
    uint256 tokenAmount;
    uint256 tokensPerClaim;
    address tokenAddress;
    address vaultAddress;
    address creator;
    string metadata;
}

struct Airdrop {
    uint64 chainId;
    uint256 localAirdropId;
    address creator;
    address tokenAddress;
    uint256 tokenAmount;
    uint256 tokensPerClaim;
    uint256 tokensClaimed;
    address vaultAddress;
    string metadata;
    bytes32 createdAttestationId;
    bytes32[] claimAttestations;
}

struct CrosschainAirdrop {
    uint64 chainId;
    uint256 localAirdropId;
    address creator;
    address tokenAddress;
    uint256 tokenAmount;
    uint256 tokensPerClaim;
    uint256 tokensClaimed;
    address vaultAddress;
    string metadata;
}

struct CrosschainClaim {
    uint256 localAirdropId;
    address claimer;
    uint256 nullifier;
}

struct CreateAttestationEncodeParams {
    uint256 airdropId;
    uint64 chainId;
    address vaultAddress;
    address tokenAddress;
    uint256 tokenAmount;
    uint256 tokensPerClaim;
    address creator;
    string metadata;
}

struct ClaimAttestationEncodeParams {
    uint256 airdropId;
    uint64 chainId;
    uint256 worldcoinNullifier;
    address claimer;
    uint256 amountClaimed;
}

struct Humanness {
    address signal;
    uint256 root;
    uint256 nullifier;
    uint256[8] proof;
}
