
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IEAS, AttestationRequest, AttestationRequestData } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import { NO_EXPIRATION_TIME, EMPTY_UID } from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";

error NotOwner(address caller);
error WorldCoinVerificationFailed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);
error HumanAlreadyClaimed(uint256 airdropId, address signal, uint256 root, uint256 nullifierHash, bytes proof);
error NotEnoughCrosschainFee(uint256 balance, uint256 fee);
error NotAuthorizedCrosschain(uint64 chain, address caller, bool isChainlink);
error VaultInitFailed(address vaultAddress);
error NotEnoughAllowance(uint256 tokenAmount);
error InvalidEAS();

contract DropifyCore {

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

    struct ConstructorParams{
        uint64 chainId;
        address vaultImplementation;
        address ccipRouter;
        address hyperlaneRouter;
        IEAS eas;
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

    IEAS private immutable _eas;
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
    uint64 public chainId;
    
    bytes4 public constant INITIALIZE_VAULT_METHOD_ID=bytes4(keccak256("initialize(address,uint256,uint256,string)"));
    
    constructor(ConstructorParams memory _params){
        aidropIds = 0;
        owner = msg.sender;
        vaultImplementation = _params.vaultImplementation;
        ccipRouter = _params.ccipRouter;
        hyperlaneRouter = _params.hyperlaneRouter;
        chainId = _params.chainId;
        if (address(eas) == address(0)) {
            revert InvalidEAS();
        }
        _eas = eas;
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

    function initalize(address[] memory _hyperlaneAddresses, uint64[] memory _hyperlaneSelectors, address[] memory _chainlinkAddresses, uint64[] memory _chainlinkSelectors) public onlyOwner{
        for(uint i=0; i < _chainlinkAddresses.length; i++) _chainlinkAddresses[_chainlinkSelectors[i]] = _chainlinkAddresses[i];
        for(uint i=0; i < _hyperlaneAddresses.length; i++) hyperlaneDeployments[_hyperlaneSelectors[i]] = _hyperlaneAddresses[i];
        initialized=true;
    }

    function createAirdrop(CreateAirdropParams memory params) public onlyInitialized{

        if(IERC20(params.tokenAddress).allowance(msg.sender, address(this))<params.tokenAmount) revert NotEnoughAllowance(params.tokenAmount);

        address vaultAddress = _deployProxy(vaultImplementation, localAirdropIds);
        bytes memory initData = abi.encodeWithSelector(
            INITIALIZE_VAULT_METHOD_ID,
            params.tokenAddress,
            params.tokenAmount,
            params.tokensPerClaim,
            params.metadata
        );
        (bool success, ) = vaultAddress.call(initData);
        if(!success) revert VaultInitFailed(vaultAddress);

        // TODO: Make an on-chain attestation and update the state in Aidrop
        _eas.attest(
            AttestationRequest({
                schema: schema,
                data: AttestationRequestData({
                recipient: address(0), // No recipient
                expirationTime: NO_EXPIRATION_TIME, // No expiration time
                revocable: true,
                refUID: EMPTY_UID, // No references UI
                data: abi.encode(input), // Encode a single uint256 as a parameter to the schema
                value: 0 // No value/ETH
            })
            })
        );

        emit AirdropCreated(aidropIds, chainId, mockParams.createdAttestationId, mockParams.vaultAddress, params.tokenAmount, params.tokensPerClaim, params.metadata);
        aidropIds++;
        localAirdropIds++;
    }

    // TODO: Remove the onlyAuthroizedCrosschain modifier comment
    function receiveCreateAirdrop(address crossChainAddress, bool isChainlink, uint64 _chain, CrosshchainCreateAirdropParams memory params) public /*onlyAuthorizedCrosschain(crossChainAddress, params.chain, isChainlink) onlyInitialized*/ {
        // TODO: Make an on-chain attestation and update the state in Aidrop 

        emit AirdropCreated(params.localAirdropId, _chain, params.localAirdropId, params.vaultAddress, params.tokenAmount, params.tokensPerClaim, params.metadata);
    }

    function claimAirdrop(uint256 airdropId, address claimerAddress, uint256 amountClaimed, uint256 attestationId, Humanness memory humanness) public /*onlyOwner onlyInitialized*/ {
        // TODO: Verify Worldcoin proof

        // TODO: Make an onchain attestation and update the state in Airdrop.
        // TODO: Add chain Id
        emit AidropClaimed(airdropId, attestationId, claimerAddress, humanness.nullifier, amountClaimed);
    }
    
    function _deployProxy(
        address implementation,
        uint salt
    ) internal returns (address _contractAddress) {
        bytes memory code = _creationCode(implementation, salt);
        _contractAddress = Create2.computeAddress(
            bytes32(salt),
            keccak256(code)
        );
        if (_contractAddress.code.length != 0) return _contractAddress;

        _contractAddress = Create2.deploy(0, bytes32(salt), code);
    }

    function _creationCode(
        address implementation_,
        uint256 salt_
    ) internal pure returns (bytes memory) {
        return
            abi.encodePacked(
                hex"3d60ad80600a3d3981f3363d3d373d3d3d363d73",
                implementation_,
                hex"5af43d82803e903d91602b57fd5bf3",
                abi.encode(salt_)
            );
    }

}