pragma solidity >=0.5.0 <0.7.0;
import "@nomiclabs/buidler/console.sol";
contract MyContract {
  address public owner;
  constructor() public {
    owner = msg.sender;
    console.log("MyContract is owned by:",owner);
  }
  
}