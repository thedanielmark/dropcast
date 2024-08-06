
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


error NotOwner(address caller);
error WorldCoinVerificationFailed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);
error HumanAlreadyClaimed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);

contract DropifyCrosschainMock {

    struct CreateAirdropParams{
        address tokenAddress;
        uint256 tokenAmount;
        uint256 tokensPerClaim;
        string metadata;
    }

    // TODO: Delete the Mock params
    struct MockParams{
        uint256 createdAttestationId;
        address vaultAddress;
    }

     struct Airdrop {
        address creator;
        address tokenAddress;
        uint256 tokenAmount;
        uint256 tokensPerClaim;
        uint256 tokensClaimed;
        address vaultAddress;
        string metadata;
        uint256 createdAttestationId;
        uint256[] claimAttestations;
    }

    struct Humanness {
        uint256 nullifier;
        bytes proof;
    }

    mapping(uint256 => Airdrop) public airdrops;
    mapping(uint256=>mapping(uint256=>bool)) public nullifiers;
    uint256 public aidropIds;
    address public owner;
    uint256 public chainId;

    constructor(uint256 _chainId){
        aidropIds = 0;
        owner = msg.sender;
        chainId = _chainId;
    }


    event AirdropCreated(uint256 airdropId, uint256 chain, uint256 attestationId, address vaultAddress, uint256 tokenAmount, uint256 tokensPerClaim, string metadata);
    event AidropClaimed(uint256 airdropId, uint256 attestationId, address  claimerAddress, uint256 nullifierHash, uint256 amountClaimed);

    modifier onlyOwner{
        if(msg.sender != owner){
            revert NotOwner(msg.sender);
        }
        _;
    }

    // TODO: Delete the Mock params
    function createAirdrop(CreateAirdropParams memory params, MockParams memory mockParams) public{
        // TODO: Deploy a vault and update the state in Airdrop

        // TODO: Make an on-chain attestation and update the state in Aidrop

        emit AirdropCreated(aidropIds, params.chain, mockParams.createdAttestationId, mockParams.vaultAddress, params.tokenAmount, params.tokensPerClaim, params.metadata);
        aidropIds++;
    }

    function claimAirdrop(uint256 airdropId, address claimerAddress, uint256 amountClaimed, uint256 attestationId, Humanness memory humanness) public onlyOwner  {
        // TODO: Verify Worldcoin proof

        // TODO: Make an onchain attestation and update the state in Airdrop
        emit AidropClaimed(airdropId, attestationId, claimerAddress, humanness.nullifier, amountClaimed);
    }

}