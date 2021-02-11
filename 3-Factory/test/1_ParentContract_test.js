

const ParentContract = artifacts.require('ParentContract.sol');


var accounts;

contract('ParentContract', function(accounts) {
   
    it('should set price to 2', async() => {
        const ParentInstance = await ParentContract.deployed(); 
        await ParentInstance.addPrice (2);
        
        
    });

    it('should set volume to 3', async() => {
        const ParentInstance = await ParentContract.deployed(); 
        await ParentInstance.addVolume (3);
        
        
    });

    it('should return price and volume', async() => {
        const ParentInstance = await ParentContract.deployed(); 

        const price = await ParentInstance.readPrice.call();
        const volume = await ParentInstance.readVolume.call();

        console.log('The price is:', price.toNumber());
        console.log('The volume is:', volume.toNumber());
    });






});
