
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

error NotOwner(address caller);
error WorldCoinVerificationFailed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);
error HumanAlreadyClaimed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);
error NotEnoughCrosschainFee(uint256 balance, uint256 fee);

contract DropifyCoreMock {

    struct CreateAirdropParams{
        uint64 chain;
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

    struct ConstructorParams{
        address vaultImplementation;
        address ccipRouter;
        address hyperlaneRouter;
        address[] chainlinkCcipDeployments;
        uint64[] chainlinkCcipChains;
        address[] hyperlaneDeployments;
        uint64[] hyperlaneChains;
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
    address public vaultImplementation;
    address public ccipRouter;
    address public hyperlaneRouter;
    mapping(uint64=>address) public chainlinkCcipDeployments;
    mapping(uint64=>address) public hyperlaneDeployments;
    
    constructor(ConstructorParams memory _params){
        aidropIds = 0;
        owner = msg.sender;
        vaultImplementation = _params.vaultImplementation;
        ccipRouter = _params.ccipRouter;
        hyperlaneRouter = _params.hyperlaneRouter;
        for(uint i=0; i<_params.chainlinkCcipDeployments.length; i++) chainlinkCcipDeployments[_params.chainlinkCcipChains[i]] = _params.chainlinkCcipDeployments[i];
        for(uint i=0; i<_params.hyperlaneDeployments.length; i++) hyperlaneDeployments[_params.hyperlaneChains[i]] = _params.hyperlaneDeployments[i];
    }

    event AirdropCreated(uint256 airdropId, uint64 chain, uint256 attestationId, address vaultAddress, uint256 tokenAmount, uint256 tokensPerClaim, string metadata);
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