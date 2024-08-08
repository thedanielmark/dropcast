
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


error NotOwner(address caller);
error WorldCoinVerificationFailed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);
error HumanAlreadyClaimed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);
error NotAuthorizedCrosschain(uint64 chain, address caller);

contract DropifyCrosschainMock {

    struct CreateAirdropParams{
        address tokenAddress;
        uint256 tokenAmount;
        uint256 tokensPerClaim;
        string metadata;
    }

    struct CrosschainClaimParams{
        uint256 localAirdropId;
        address claimer;
        uint256 claimAttestationId;
        uint256 nullifer;
    }

    // TODO: Delete the Mock params
    struct MockParams{
        bytes32 crosschainMessageId;
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
    uint64 public chain;

    address public coreAddress;
    uint64 public coreSelector;
    uint64 public coreHyperlaneSelector;

    constructor(uint64 _chain, address _coreAddress, uint64 _coreSelector){
        aidropIds = 0;
        owner = msg.sender;
        chain = _chain;
        coreAddress = _coreAddress;
        coreSelector = _coreSelector;
    }

    event AirdropCrosschainCreated(uint256 localAirdropId, bytes32 crosschainMessageId, address vaultAddress, uint256 tokenAmount, uint256 tokensPerClaim, string metadata);
    event AidropClaimed(uint256 airdropId, address claimerAddress, uint256 nullifierHash, uint256 claimAttestaionId, uint256 amountClaimed);

    modifier onlyOwner{
        if(msg.sender != owner){
            revert NotOwner(msg.sender);
        }
        _;
    }

    modifier onlyAuthorizedCrosschain(address _caller, uint64 _chain ){
       if(coreAddress != _caller || coreSelector != _chain) revert NotAuthorizedCrosschain(_chain, _caller);
        _;
    }



    // TODO: Delete the Mock params
    function createAirdrop(CreateAirdropParams memory params, MockParams memory mockParams) public{
        // TODO: Deploy a vault and update the state in Airdrop

        // TODO: Send a crosschain transaction
        emit AirdropCrosschainCreated(aidropIds, mockParams.crosschainMessageId, mockParams.vaultAddress, params.tokenAmount, params.tokensPerClaim, params.metadata);
        aidropIds++;
    }


    function receiveClaimAirdrop(address _caller, uint64 _chain, CrosschainClaimParams memory params) public onlyAuthorizedCrosschain(msg.sender, chain){ 

        // TODO: Disperse the funds from the vault to the claimer
        emit AidropClaimed(params.localAirdropId, params.claimer, params.nullifer, params.claimAttestationId, airdrops[params.localAirdropId].tokensPerClaim);
    }

}