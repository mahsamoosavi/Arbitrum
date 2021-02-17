

const CallMarket = artifacts.require('CallMarket.sol');
const DappToken = artifacts.require('DappToken');

const addressDappToken = '0x2dc4dea5281738a92e8de9137a1088403dd3c160'; //the address of the ERC20 token; it has the same address as Kovan
var CallMarketaddress;

var accounts;




//******************* Deploys the CallMaket and stores its address *************************
contract('CallMarket', function(accounts) {
    //*******************Test 1*************************
    it('should store the address of the CallMarket into the var CallMarketaddress', async() => {
        const CallMarketInstance = await CallMarket.deployed(); 
        CallMarketaddress = CallMarketInstance.address;
        console.log('The address of the CallMarket contract is:', CallMarketInstance.address);
        console.log('********************************************');
        
    });

    //*******************Test 2*************************
    it('should deposit tokens from accounst[0] to the CallMarket contract', async() => {

        const CallMarketInstance = await CallMarket.deployed(); 
       
        accounts = await web3.eth.getAccounts();

        const DappTokenInstance = await DappToken.at(addressDappToken); //loads the DappToken from its address
        await DappTokenInstance.approve(CallMarketaddress, 60, {from: accounts[0]});
       
        const receipt = await CallMarketInstance.depositToken (addressDappToken, 60, {from: accounts[0]});

        const totalTokenbalance = await CallMarketInstance.totalTokenBalance(accounts[0]);
        const totalEtherbalance = await CallMarketInstance.totalEtherBalance(accounts[0]);

        console.log('The token balance of account[0] (Bob) is:', totalTokenbalance.toNumber());
        console.log('The Ether balance of account[0] (Bob) is:', totalEtherbalance.toNumber());
        console.log('********************************************');
    });
    //*******************Test 3*************************
    it('should deposit Ethers from accounts[0] to the CallMarket contract', async() => {
        
        const CallMarketInstance = await CallMarket.deployed(); 

        accounts = await web3.eth.getAccounts();

        //Following "value" is in wei.
        //1 ether = 1,000,000,000,000,000,000 wei
        //Note that the sender must have enough ether on Arbitrum to be able to do the transfer (This can be done using https://bridge.offchainlabs.com/)
        await CallMarketInstance.depositEther({from: accounts[0], value: 320}); //transferring 0.000000000000000001 eth
        
                
        
        const totalEtherbalance = await CallMarketInstance.totalEtherBalance(accounts[0]);
        const totalTokenbalance = await CallMarketInstance.totalTokenBalance(accounts[0]);

        console.log('The Ether balance of accounts[0]  is:',totalEtherbalance.toNumber());
        console.log('The token balance of accounts[0] is:',totalTokenbalance.toNumber());
        console.log('********************************************');
        const num = await CallMarketInstance.getBalance();
        console.log('The Ether balance of Lissy is:', num.toNumber()); 
        console.log('********************************************');
    });
    //*******************Test 4*************************

    it('should open the market on the Dapp Token', async() => {
        const CallMarketInstance = await CallMarket.deployed(); 

        const receipt = await CallMarketInstance.openMarket ();
        //const gasUsed = receipt.receipt.gasUsed;
        //console.log(`GasUsed for openning the market: ${receipt.receipt.gasUsed}`);
        console.log('********************************************');
    });
    //*******************Test 5*************************
    
    it('should submit asks from accounst[0]', async() => {
        const CallMarketInstance = await CallMarket.deployed(); 
        var receipt = null;
        var array = [];
    
        accounts = await web3.eth.getAccounts();
        for(let j = 10; j >= 1  ; j--){
            await CallMarketInstance.submitAsk (1, 1 , {from: accounts[0]});
            array.push(j);
            //console.log('Ask',j,' volume is equal to:', 1);
        } 
        console.log(array.length,'asks have been succsessfully submitted');
        console.log('********************************************');
    });
   
    // //*******************Test 6*************************
    it('should submit Bids from accounst[1]', async() => {
        
        const CallMarketInstance = await CallMarket.deployed();  
        var receipt = null;
        var array = [];
        
        accounts = await web3.eth.getAccounts();
        for(let j = 11; j <= 20  ; j++){
           
            await CallMarketInstance.submitBid (j, 1, {from: accounts[0]});
            array.push(j);
            //console.log('Bid',j,' volume is equal to:', 1);

        } 
        console.log(array.length,'bids have been succsessfully submitted');
        console.log('********************************************');
    });

    
    //*******************Test 7*************************
    // it('should return the Gasestimate for the match() function', async() => {
        
    //     const CallMarketInstance = await CallMarket.deployed();
    //     const gasEstimate =  await CallMarketInstance.matchOrders.estimateGas();
    //     console.log(gasEstimate); 
    //     console.log('********************************************');
    // });  

    //*******************Test 8*************************
    it('should close the market and match the orders', async() => {
        
        const CallMarketInstance = await CallMarket.deployed();

        const receipt = await  CallMarketInstance.closeMarket();
        //const gasUsed = receipt.receipt.gasUsed;
        //console.log(`GasUsed for Matching the orders: ${receipt.receipt.gasUsed}`); 
        console.log('the tx receipt is:', receipt);
        //console.log('********************************************');
    });    
    
 
    
// //*******************Test 9*************************
    it('should send back the tokens and ether', async() => {
        
        const CallMarketInstance = await CallMarket.deployed();

        const totalEtherbalance = await CallMarketInstance.totalEtherBalance(accounts[0]);
        await CallMarketInstance.claimEther(totalEtherbalance); 

        const totalTokenbalance = await CallMarketInstance.totalTokenBalance(accounts[0]);
        await CallMarketInstance.claimTokens(addressDappToken, totalTokenbalance); 
        //console.log('********************************************');
    });



        
     
  


    





});
