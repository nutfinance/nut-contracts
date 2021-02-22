const nut = artifacts.require('NutToken')
const masterchef = artifacts.require('MasterChef')

const MockBUSD = artifacts.require('MockERC20')

const migration = async (deployer, network, accounts) => {
    await Promise.all([deployToken(deployer, network, accounts)])
}


module.exports = migration

// ============ Deploy Functions ============

async function deployToken(deployer, network, accounts) {

    const unit = web3.utils.toBN(10 ** 18)
    let NutPerBlock = unit.muln(1).toString();

    let startBlock = 4207850
    //let bonusEndBlock = 5007794

    let Nut = await nut.deployed()
    
    await deployer.deploy(
        masterchef,
        Nut.address,
        accounts[0],
        accounts[0],
        NutPerBlock,
        startBlock
    );

    if(network !== "bsc") {
        let supply = unit.muln(1000000).toString();
        const busd = await deployer.deploy(MockBUSD, "BUSD", "BUSD", supply);
        console.log(`MockBUSD address: ${busd.address}`);
    }
}
