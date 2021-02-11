var ParentContract = artifacts.require("./ParentContract.sol"); 



module.exports =  function (deployer) {
    
    //deployer.deploy(CallMarket,{overwrite: false});
    deployer.deploy(ParentContract);
    console.log("ParentContract was deployed!");


};

// module.exports = function (deployer) {
//     deployer.deploy(MP);
//     console.log("I was deployed!");
// };


// module.exports = function (deployer) {
//     deployer.deploy(Int).then(() => {
//         deployer.deploy(CallMarket);
//     });
//     deployer.link(Int, User);
// };
