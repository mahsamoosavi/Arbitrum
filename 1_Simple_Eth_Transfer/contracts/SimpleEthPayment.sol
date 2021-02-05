pragma solidity >=0.4.22;


contract SimpleEthPayment{
    
    mapping(address => uint256) public EtherBalance;

    function depositEther() public payable
    {
        EtherBalance[msg.sender] += msg.value;

    }

    function claimEther (uint256 numofEthers) public 
    {
        uint256 EthersToBeClaimed = numofEthers ;
        EtherBalance[msg.sender] -= EthersToBeClaimed;
        msg.sender.transfer(EthersToBeClaimed);
    }  


    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }



    
}