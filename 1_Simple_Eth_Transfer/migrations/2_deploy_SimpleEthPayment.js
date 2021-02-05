var SimpleEthPayment = artifacts.require("SimpleEthPayment"); 


module.exports = function (deployer) {
   

    deployer.deploy(SimpleEthPayment);
    console.log("SimpleEthPayment was deployed!");

    

};

