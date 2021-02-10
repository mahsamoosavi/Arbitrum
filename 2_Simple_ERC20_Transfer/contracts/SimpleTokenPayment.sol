pragma solidity >=0.4.22;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleTokenPayment{
    
    mapping(address => uint256) public TokenBalance;


    function depositToken(address token, uint256 numofTokens) external returns (bool) {
        
        TokenBalance[msg.sender] += numofTokens;
        IERC20(token).transferFrom(msg.sender, address(this), numofTokens);   
        return true;
    
    }

    function claimToken(address token, uint256 numofTokens ) external returns (bool)
    {
        
        uint256 tokensToBeClaimed = numofTokens ;
        TokenBalance[msg.sender] -= tokensToBeClaimed;
        IERC20(token).transfer(msg.sender, tokensToBeClaimed);
        return true;
    } 


    function getBalance(address token) public view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
       
    }





    
}