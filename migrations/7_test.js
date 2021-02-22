const nut = artifacts.require('NutToken')
const masterchef = artifacts.require('MasterChef')
const MockBUSD = artifacts.require('MockERC20')

const migration = async (deployer, network, accounts) => {
    await Promise.all([deployToken(deployer, network, accounts)])
}

module.exports = migration

async function deployToken(deployer, network, accounts) {

   let Masterchef = await masterchef.deployed()
    
   await Masterchef.add(
       300,
       "0x7771F3D79204102bB35d641A84FEcF8cbce03308",
       400,
       false
   )

    // const unit = web3.utils.toBN(10 ** 18)
    // let supply = unit.muln(1000000).toString();
    // const busd = await deployer.deploy(MockBUSD, "DAI", "DAI", supply);
    // console.log(`MockBUSD address: ${busd.address}`);
}