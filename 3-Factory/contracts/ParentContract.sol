pragma solidity >=0.4.22;
pragma experimental ABIEncoderV2;


import "./ChildContract.sol";

contract ParentContract{

    ChildContract public cildcontract = new ChildContract();
    

    function addPrice (uint256 _price) public returns (bool)
    {
        
        cildcontract.setPrice(_price);
        return true;
    }


    function addVolume (uint256  _volume) public returns (bool)
    {
        
        cildcontract.setVolume(_volume);
        return true;

    }

    function readPrice() public view returns (uint256)
    {
        
        return (cildcontract.getPrice());

    }

    function readVolume() public view returns (uint256)
    {
        
        return (cildcontract.getVolume());

    }
                                                                                                                                                                                   
}                                                                                                                                                                                                                                                                                                                                                                                                       