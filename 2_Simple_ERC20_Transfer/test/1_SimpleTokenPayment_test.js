const SimpleTokenPayment = artifacts.require('SimpleTokenPayment');

const DappToken = artifacts.require('DappToken');

const addressDappToken = '0xd2ED90A6427e0B211db159Be0814EAf6594605FC'; //the address of the ERC20 token; it has the same address as Kovan
var addressSimplePayment;

contract('SimpleTokenPayment', function(accounts) {

//*********************************************************************************************
    it('should deposit DappToken from accounts[0] to the SimpleTokenPayment contract', async() => {
        
        const SimpleTokenPaymentInstance = await SimpleTokenPayment.deployed(); 

        addressSimplePayment = SimpleTokenPaymentInstance.address;

        const DappTokenInstance = await DappToken.at(addressDappToken); //loads the DappToken from its address
        
        console.log('The address of the SimpleTokenPayment contract is:', SimpleTokenPaymentInstance.address);

        const num1 = await SimpleTokenPaymentInstance.getBalance(addressDappToken);
        console.log('The DappToken balance of SimpleTokenPayment before deposit is:', num1.toNumber()); 
        
        await DappTokenInstance.approve(addressSimplePayment, 20, {from: accounts[0]});

        accounts = await web3.eth.getAccounts();

        
        const allowance = await DappTokenInstance.allowance(accounts[0],addressSimplePayment);
        
    
        await SimpleTokenPaymentInstance.depositToken(addressDappToken, 20 , {from: accounts[0]}); 
        console.log('********************************************');
        console.log('the allowance is:', allowance.toNumber());

        console.log('********************************************');
        
        const num2 = await SimpleTokenPaymentInstance.getBalance(addressDappToken);
        console.log('The DappToken balance of SimpleTokenPayment after deposit is:', num2.toNumber()); 
        console.log('********************************************');
     
    });
    //*********************************************************************************************
    it('should transfer DappToken from SimpleTokenPayment contract to the accounts[0]', async() => {
        
        const SimpleTokenPaymentInstance = await SimpleTokenPayment.deployed(); 


        addressSimplePayment = SimpleTokenPaymentInstance.address;

        const DappTokenInstance = await DappToken.at(addressDappToken); //loads the DappToken from its address
    
        const tokenbalance = await DappTokenInstance.balanceOf(accounts[0]);
        console.log('The DappToken balance of accounts[0] before claiming his tokens from Lissy is:', tokenbalance.toNumber()); 
        
        console.log('********************************************');
        
     
        await SimpleTokenPaymentInstance.claimToken(addressDappToken, 20); 
        
        console.log('********************************************');
        
        const tokenbalance2 = await DappTokenInstance.balanceOf(accounts[0]);
        console.log('The DappToken balance of accounts[0] after claiming his tokens from Lissy is:', tokenbalance2.toNumber()); 
     
    });




});

