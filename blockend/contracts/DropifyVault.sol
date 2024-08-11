
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

error DisabledFunction();

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DropifyVault {

    bool public initialized;

    IERC20 public token;
    uint256 public amount;
    uint256 public tokensPerClaim;
    string public metadata;
    address public coreAddress;

    constructor() {
        initialized=true;
    }

    event VaultInitialized(address token, uint256 amount, uint256 tokensPerClaim, string metadata);
    event TokensReleased(address to, uint256 amount);

    modifier onlyInitializing() {
        require(!initialized, "Contract already initialized");
        _;
    }
    
    modifier onlyInitialized() {
        require(initialized, "Contract not initialized");
        _;
    }

    modifier onlyCore{
        require(msg.sender == coreAddress, "Not authorized");
        _;
    }

    function initialize(address _token, address _coreAddress, uint256 _amount, uint256 _tokensPerClaim, string memory _metadata) external onlyInitializing {
        initialized=true;
        token=IERC20(_token);
        amount=_amount;
        tokensPerClaim=_tokensPerClaim;
        metadata=_metadata;
        coreAddress=_coreAddress;
        emit VaultInitialized(_token, _amount, _tokensPerClaim, _metadata);
    }


    function releaseTokens(address _to, uint256 _amount) external onlyInitialized onlyCore{
        token.transfer(_to, _amount);

        emit TokensReleased(_to, _amount);
    }
}