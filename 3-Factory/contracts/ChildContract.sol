pragma solidity >=0.4.22;
pragma experimental ABIEncoderV2;


contract ChildContract{

    uint256 public Price;
    uint256 public Volume;

    function setPrice (uint256 price) external 
    {
        Price = price;
    }    
    function setVolume (uint256 volume) external 
    {
        Volume = volume;
    } 

    function getPrice () external view returns (uint256)
    {
        return Price;
    } 
    function getVolume () external view returns (uint256)
    {
        return Volume;
    } 
}