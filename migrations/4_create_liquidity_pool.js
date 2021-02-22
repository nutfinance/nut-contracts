const nut = artifacts.require('NutToken')
const MockBUSD = artifacts.require('MockERC20')
const IBEP20 = artifacts.require('IBEP20');

const UniswapV2Factory = artifacts.require('UniswapV2Factory');

const knownContracts = require('./known-contracts');

const migration = async (deployer, network, accounts) => {
    await Promise.all([deployToken(deployer, network, accounts)])
}

module.exports = migration

async function deployToken(deployer, network, accounts) {
    let Nut = await nut.deployed()

    let BUSD = network === "bsc"? IBEP20.at(knownContracts.BUSD[network]):await MockBUSD.deployed();

    let uniswap

    if (['development'].includes(network)) {
        console.log('Deploying uniswap on dev network.');
        await deployer.deploy(UniswapV2Factory, accounts[0])
        uniswap = await UniswapV2Factory.deployed()
    } else {
        uniswap = await UniswapV2Factory.at(knownContracts.UniswapV2Factory[network])
    }

    await uniswap.createPair(BUSD.address, Nut.address)
    await uniswap.createPair(knownContracts.WBNB[network], Nut.address)
    
    if(network !== "bsc") {
        await uniswap.createPair(knownContracts.WBNB[network], BUSD.address)
    }
}