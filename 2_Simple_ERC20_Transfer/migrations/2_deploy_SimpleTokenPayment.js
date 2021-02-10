var SimpleTokenPayment = artifacts.require("SimpleTokenPayment"); 


module.exports = function (deployer) {
   

    deployer.deploy(SimpleTokenPayment);
    console.log("SimpleTokenPayment was deployed!");

    

};

