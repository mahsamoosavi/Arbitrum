const SimpleEthPayment = artifacts.require('SimpleEthPayment');


contract('SimpleEthPayment', function(accounts) {

//*********************************************************************************************
    it('should deposit Ether from accounts[0] to the SimpleEthPayment contract', async() => {
        
        const SimpleEthPaymentInstance = await SimpleEthPayment.deployed(); 

        console.log('The address of the SimpleEthPayment contract is:', SimpleEthPaymentInstance.address);

        const num1 = await SimpleEthPaymentInstance.getBalance();
        console.log('The Ether balance of SimpleEthPayment before deposit is:', num1.toNumber()); 

        //Following "value" is in wei.
        //1 ether = 1,000,000,000,000,000,000 wei
        //Note that the sender must have enough ether on Arbitrum to be able to do the transfer (This can be done using https://bridge.offchainlabs.com/)
        await SimpleEthPaymentInstance.depositEther({value: 10}); //transferring 0.000000000000000001 eth
        

        console.log('********************************************');
        
        const num2 = await SimpleEthPaymentInstance.getBalance();
        console.log('The Ether balance of SimpleEthPayment after deposit is:', num2.toNumber()); 
     
    });
    //*********************************************************************************************
    it('should transfer eth from SimpleEthPayment contract to the accounts[0]', async() => {
        
        const SimpleEthPaymentInstance = await SimpleEthPayment.deployed(); 
    
        const num1 = await SimpleEthPaymentInstance.getBalance();
        console.log('The Ether balance of SimpleEthPayment before transfer is:', num1.toNumber()); 
        
        const redeemablevalue = await SimpleEthPaymentInstance.EtherBalance(accounts[0]);
        await SimpleEthPaymentInstance.claimEther(redeemablevalue); 
        
        console.log('********************************************');
        
        const num2 = await SimpleEthPaymentInstance.getBalance();
        console.log('The Ether balance of SimpleEthPayment after transfer is:', num2.toNumber()); 
     
    });




});

