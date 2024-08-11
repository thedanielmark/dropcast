
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IEAS, AttestationRequest, AttestationRequestData } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import { NO_EXPIRATION_TIME, EMPTY_UID } from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "./interface/IVault.sol";
import "./library/ByteHasher.sol";
import "./StructsAndErrors.sol";
import { IWorldID } from "./interface/IWorldID.sol";


contract DropifyCore is CCIPReceiver {
    using ByteHasher for bytes;

    struct ConstructorParams{
        uint64 chainId;
        address vaultImplementation;
        address ccipRouter;
        address hyperlaneRouter;
        IEAS eas;
        bytes32 createAirdropSchema;
        bytes32 claimAirdropSchema;
        IWorldID worldId;
        string appId;
        string action;
    }

    // Worldcoin Variables
    IWorldID internal immutable worldId;
    uint256 internal immutable externalNullifierHash;
    uint256 internal immutable groupId = 1;

    // EAS Variables
    IEAS private immutable _eas;
    
    // Dropify Variables
    mapping(uint256 => Airdrop) public airdrops;
    mapping(uint256=>mapping(uint256=>bool)) public nullifiers;
    uint256 public aidropIds;
    uint256 public localAirdropIds;
    address public owner;
    address public vaultImplementation;
    bytes32 public createAirdropSchema;
    bytes32 public claimAirdropSchema;

    // Chainlink Variables
    mapping(uint64=>address) public crosschainDeployments;
    mapping(uint64=>uint64) public chainToSelectors;

    bool public initialized;
    uint64 public chainId;
    
    bytes4 public constant INITIALIZE_VAULT_METHOD_ID=bytes4(keccak256("initialize(address,address,uint256,uint256,string)"));

    constructor(ConstructorParams memory _params) CCIPReceiver(_params.ccipRouter){
        aidropIds = 0;
        owner = msg.sender;
        vaultImplementation = _params.vaultImplementation;
        chainId = _params.chainId;
        if (address(_params.eas) == address(0)) {
            revert InvalidEAS();
        }
        _eas = _params.eas;
        createAirdropSchema = _params.createAirdropSchema;
        claimAirdropSchema = _params.claimAirdropSchema;
        worldId = _params.worldId;
        externalNullifierHash = abi
        .encodePacked(abi.encodePacked(_params.appId).hashToField(), _params.action)
        .hashToField();
    }

    event AirdropCreated(uint256 airdropId, uint256 localAirdropId, uint64 chain, bytes32 attestationId, address creator, address vaultAddress, uint256 tokenAmount, uint256 tokensPerClaim, string metadata);
    event AirdropClaimed(uint256 airdropId, bytes32 claimAttestationId, address claimerAddress, uint256 nullifierHash, uint256 amountClaimed);
    event AirdropCrosschainClaimed(uint256 airdropId, uint64 chainId, bytes32 crosschainMessageId, bytes32 claimAttestationId, address claimerAddress, uint256 nullifierHash, uint256 amountClaimed);
   
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

    modifier onlyAuthorizedCrosschain(address _caller, uint64 _chain){
        if(crosschainDeployments[_chain] != _caller) revert NotAuthorizedCrosschain(_chain, _caller);
        _;
    }

    function initalize(address[] memory _chainlinkAddresses, uint64[] memory _chainIds,  uint64[] memory _chainlinkSelectors) external onlyOwner{
        for(uint i=0; i < _chainlinkAddresses.length; i++) crosschainDeployments[_chainlinkSelectors[i]] = _chainlinkAddresses[i];
        for(uint i=0; i < _chainIds.length; i++) chainToSelectors[_chainIds[i]] = _chainlinkSelectors[i];
        initialized=true;
    }

    function createAirdrop(CreateAirdropParams memory params) external onlyInitialized{

        if(IERC20(params.tokenAddress).allowance(msg.sender, address(this)) < params.tokenAmount) revert NotEnoughAllowance(params.tokenAmount);

        address vaultAddress = _deployProxy(vaultImplementation, localAirdropIds);
        bytes memory initData = abi.encodeWithSelector(
            INITIALIZE_VAULT_METHOD_ID,
            params.tokenAddress,
            address(this),
            params.tokenAmount,
            params.tokensPerClaim,
            params.metadata
        );
        (bool success, ) = vaultAddress.call(initData);
        if(!success) revert VaultInitFailed(vaultAddress);

        IERC20(params.tokenAddress).transferFrom(msg.sender, vaultAddress, params.tokenAmount);

        bytes32 _attestationId = _eas.attest(
            AttestationRequest({
                schema: createAirdropSchema,
                data: AttestationRequestData({
                recipient: msg.sender, 
                expirationTime: NO_EXPIRATION_TIME,
                revocable: false, 
                refUID: EMPTY_UID,
                data: _getCreateAttestationEncodedData(CreateAttestationEncodeParams(aidropIds, chainId, vaultAddress, params.tokenAddress, params.tokenAmount, params.tokensPerClaim, msg.sender, params.metadata)),
                value: 0 
            })
            })
        );

        airdrops[aidropIds] = Airdrop({
            chainId: chainId,
            localAirdropId: localAirdropIds,
            creator: msg.sender,
            tokenAddress: params.tokenAddress,
            tokenAmount: params.tokenAmount,
            tokensPerClaim: params.tokensPerClaim,
            tokensClaimed: 0,
            vaultAddress: vaultAddress,
            metadata: params.metadata,
            createdAttestationId: _attestationId,
            claimAttestations: new bytes32[](0)
        });

        emit AirdropCreated(aidropIds, localAirdropIds, chainId, _attestationId, msg.sender, vaultAddress, params.tokenAmount, params.tokensPerClaim, params.metadata);
        aidropIds++;
        localAirdropIds++;
    }


     function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    )
        internal
        override
        onlyAuthorizedCrosschain(
            abi.decode(any2EvmMessage.sender, (address)),
            any2EvmMessage.sourceChainSelector
        )
    {
        (CrosschainAirdrop memory airdropParams)=abi.decode(any2EvmMessage.data, (CrosschainAirdrop));
        
        bytes32 _attestationId = _eas.attest(
            AttestationRequest({
                schema: createAirdropSchema,
                data: AttestationRequestData({
                recipient: airdropParams.creator, 
                expirationTime: NO_EXPIRATION_TIME,
                revocable: false, 
                refUID: EMPTY_UID,
                data: _getCreateAttestationEncodedData(CreateAttestationEncodeParams(aidropIds, airdropParams.chainId, airdropParams.vaultAddress, airdropParams.tokenAddress, airdropParams.tokenAmount, airdropParams.tokensPerClaim, airdropParams.creator, airdropParams.metadata)),
                value: 0 
                })
            })
        );
        
        airdrops[aidropIds] = Airdrop({
            chainId: airdropParams.chainId,
            localAirdropId: airdropParams.localAirdropId,
            creator: airdropParams.creator,
            tokenAddress: airdropParams.tokenAddress,
            tokenAmount: airdropParams.tokenAmount,
            tokensPerClaim: airdropParams.tokensPerClaim,
            tokensClaimed: 0,
            vaultAddress: airdropParams.vaultAddress,
            metadata: airdropParams.metadata,
            createdAttestationId: _attestationId,
            claimAttestations: new bytes32[](0)
        });

        emit AirdropCreated(aidropIds, airdropParams.localAirdropId, airdropParams.chainId, _attestationId, airdropParams.creator, airdropParams.vaultAddress, airdropParams.tokenAmount, airdropParams.tokensPerClaim, airdropParams.metadata);
    }

    function claimAirdrop(uint256 airdropId, Humanness memory humanness) external payable onlyOwner onlyInitialized {
        if(airdropId >= aidropIds) revert InvalidAirdropId(airdropId);
        Airdrop memory airdrop = airdrops[airdropId];
        
        if(nullifiers[airdropId][humanness.nullifier]) revert HumanAlreadyClaimed(airdropId, humanness.nullifier);
        nullifiers[airdropId][humanness.nullifier] = true;

        worldId.verifyProof(
            humanness.root,
            groupId,
            abi.encodePacked(humanness.signal).hashToField(),
            humanness.nullifier,
            externalNullifierHash,
            humanness.proof
        );

        if(airdrop.tokensClaimed + airdrop.tokensPerClaim > airdrop.tokenAmount) revert VaultDepleted(airdropId, airdrop.tokensClaimed, airdrop.tokensPerClaim, airdrop.tokenAmount);
        airdrops[airdropId].tokensClaimed += airdrop.tokensPerClaim;       

        bytes32 _attestationId = _eas.attest(
            AttestationRequest({
                schema: claimAirdropSchema,
                data: AttestationRequestData({
                recipient: humanness.signal, 
                expirationTime: NO_EXPIRATION_TIME,
                revocable: false, 
                refUID: airdrop.createdAttestationId,
                data: _getClaimAttestationEncodedData(ClaimAttestationEncodeParams(airdropId, airdrop.chainId, humanness.nullifier, humanness.signal, airdrop.tokensPerClaim)),
                value: 0 
                })
            })
        );

        if(chainId == airdrop.chainId){
            IVault(airdrop.vaultAddress).releaseTokens(humanness.signal, airdrop.tokensPerClaim);
            emit AirdropClaimed(airdropId, _attestationId, humanness.signal, humanness.nullifier, airdrop.tokensPerClaim);
        }else{
            bytes memory _data=abi.encode(CrosschainClaim(airdropId, humanness.signal, humanness.nullifier));
            bytes32 _crosschainMessageId = _sendMessagePayNative(msg.value, chainToSelectors[airdrop.chainId], _data);
            emit AirdropCrosschainClaimed(airdropId, airdrops[airdropId].chainId, _crosschainMessageId, _attestationId, humanness.signal, humanness.nullifier, airdrop.tokensPerClaim);
        }
    }

    function _sendMessagePayNative(uint256 _feePaid, uint64 _chainSelector, bytes memory _data) internal returns (bytes32 messageId)
    {
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(crosschainDeployments[_chainSelector], _data);
        IRouterClient router = IRouterClient(this.getRouter());
        uint256 fees = router.getFee(_chainSelector, evm2AnyMessage);

        if (fees > _feePaid)
            revert NotEnoughCrosschainFee(_feePaid, fees);

        messageId = router.ccipSend{value: _feePaid}(
            _chainSelector,
            evm2AnyMessage
        );

        return messageId;
    }

    function _buildCCIPMessage(
        address _receiver,
        bytes memory _data
    ) private pure returns (Client.EVM2AnyMessage memory) {
        return
            Client.EVM2AnyMessage({
                receiver: abi.encode(_receiver),
                data: _data, 
                tokenAmounts: new Client.EVMTokenAmount[](0), 
                extraArgs: Client._argsToBytes(
                    Client.EVMExtraArgsV1({gasLimit: 400_000})
                ),
                feeToken: address(0)
            });
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

    function _getCreateAttestationEncodedData(CreateAttestationEncodeParams memory encodeParams) internal pure returns (bytes memory){
        return abi.encode(encodeParams.airdropId, encodeParams.chainId, encodeParams.vaultAddress, encodeParams.tokenAddress, encodeParams.tokenAmount, encodeParams.tokensPerClaim, encodeParams.creator, encodeParams.metadata);
    }

    function _getClaimAttestationEncodedData(ClaimAttestationEncodeParams memory encodeParams) internal pure returns(bytes memory){
        return abi.encode(encodeParams.airdropId, encodeParams.chainId, encodeParams.worldcoinNullifier, encodeParams.claimer, encodeParams.amountClaimed);
    }

    function getFee(uint64 _chainId, CrosschainClaim memory params) external view returns (uint256){
        bytes memory _data=abi.encode(params);
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(msg.sender, _data);
        IRouterClient router = IRouterClient(this.getRouter());
        return router.getFee(chainToSelectors[_chainId], evm2AnyMessage);
    }

    function verifyWorldProof(Humanness memory humanness) external view returns(bool){
        worldId.verifyProof(
            humanness.root,
            groupId,
            abi.encodePacked(humanness.signal).hashToField(),
            humanness.nullifier,
            externalNullifierHash,
            humanness.proof
        );

        return true;
    }
}
