
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

error NotOwner(address caller);
error WorldCoinVerificationFailed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);
error HumanAlreadyClaimed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);
error NotEnoughCrosschainFee(uint256 balance, uint256 fee);
error NotAuthorizedCrosschain(uint64 chain, address caller, bool isChainlink);

contract DropifyCoreMock {

    struct CreateAirdropParams{
        address tokenAddress;
        uint256 tokenAmount;
        uint256 tokensPerClaim;
        string metadata;
    }

    struct CrosshchainCreateAirdropParams{
        uint256 localAirdropId;
        uint256 tokenAmount;
        uint256 tokensPerClaim;
        address tokenAddress;
        address vaultAddress;
        address creator;
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
    }

    struct Airdrop {
        uint256 localAirdropId;
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

    uint64 public CHAIN=84532;
    mapping(uint256 => Airdrop) public airdrops;
    mapping(uint256=>mapping(uint256=>bool)) public nullifiers;
    uint256 public aidropIds;
    uint256 public localAirdropIds;
    address public owner;
    address public vaultImplementation;
    address public ccipRouter;
    address public hyperlaneRouter;
    mapping(uint64=>address) public chainlinkCcipDeployments;
    mapping(uint64=>address) public hyperlaneDeployments;

    bool public initialized;
    
    constructor(ConstructorParams memory _params){
        aidropIds = 0;
        owner = msg.sender;
        vaultImplementation = _params.vaultImplementation;
        ccipRouter = _params.ccipRouter;
        hyperlaneRouter = _params.hyperlaneRouter;
    }

    event AirdropCreated(uint256 airdropId, uint64 chain, uint256 attestationId, address vaultAddress, uint256 tokenAmount, uint256 tokensPerClaim, string metadata);
    event AidropClaimed(uint256 airdropId, uint256 attestationId, address  claimerAddress, uint256 nullifierHash, uint256 amountClaimed);

    modifier onlyInitialized{
        if(!initialized) revert("Contract not initialized");
        _;
    }

    modifier onlyOwner{
        if(msg.sender != owner){
            revert NotOwner(msg.sender);
        }
        _;
    }

    modifier onlyAuthorizedCrosschain(address _caller, uint64 _chain, bool isChainlink){
        if(isChainlink){
            if(chainlinkCcipDeployments[_chain] != _caller) revert NotAuthorizedCrosschain(_chain, _caller, isChainlink);
        }else{
            if(hyperlaneDeployments[_chain] != _caller) revert NotAuthorizedCrosschain(_chain, _caller, isChainlink);
        }
        _;
    }

    function initalize(address[] _hyperlaneAddresses, uint64[] _hyperlaneSelectors, address[] _chainlinkAddresses, uint64[] _chainlinkSelectors) public onlyOwner{
        for(uint i=0; i < _chainlinkAddresses.length; i++) _chainlinkAddresses[_chainlinkSelectors[i]] = _chainlinkAddresses[i];
        for(uint i=0; i < _hyperlaneAddresses.length; i++) hyperlaneDeployments[_hyperlaneSelectors[i]] = _hyperlaneAddresses[i];
        initialized=true;
    }

    // TODO: Delete the Mock params
    function createAirdrop(CreateAirdropParams memory params, MockParams memory mockParams) public /*onlyInitialized*/{
        // TODO: Deploy a vault and update the state in Airdrop

        // TODO: Make an on-chain attestation and update the state in Aidrop

        emit AirdropCreated(aidropIds, CHAIN, mockParams.createdAttestationId, mockParams.vaultAddress, params.tokenAmount, params.tokensPerClaim, params.metadata);
        aidropIds++;
    }

    // TODO: Remove the onlyAuthroizedCrosschain modifier comment
    function receiveCreateAirdrop(address crossChainAddress, bool isChainlink, uint64 _chain, CrosshchainCreateAirdropParams memory params) public /*onlyAuthorizedCrosschain(crossChainAddress, params.chain, isChainlink) onlyInitialized*/ {
        // TODO: Make an on-chain attestation and update the state in Aidrop 

        emit AirdropCreated(params.localAirdropId, _chain, params.localAirdropId, params.vaultAddress, params.tokenAmount, params.tokensPerClaim, params.metadata);
    }

    function claimAirdrop(uint256 airdropId, address claimerAddress, uint256 amountClaimed, uint256 attestationId, Humanness memory humanness) public /*onlyOwner onlyInitialized*/ {
        // TODO: Verify Worldcoin proof

        // TODO: Make an onchain attestation and update the state in Airdrop
        emit AidropClaimed(airdropId, attestationId, claimerAddress, humanness.nullifier, amountClaimed);
    }

}