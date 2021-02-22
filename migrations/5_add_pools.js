const nut = artifacts.require('NutToken')
const masterchef = artifacts.require('MasterChef')
const MockBUSD = artifacts.require('MockERC20')

const UniswapV2Factory = artifacts.require('UniswapV2Factory');

const knownContracts = require('./known-contracts');
const pools = require('./pools')

const migration = async (deployer, network, accounts) => {
    await Promise.all([deployToken(deployer, network, accounts)])
}

module.exports = migration

async function deployToken(deployer, network, accounts) {

    let uniswap

    if (['development'].includes(network)) {
        console.log('Deploying uniswap on dev network.');
        await deployer.deploy(UniswapV2Factory, accounts[0])
        uniswap = await UniswapV2Factory.deployed()
    } else {
        uniswap = await UniswapV2Factory.at(knownContracts.UniswapV2Factory[network])
    }

    let Nut = await nut.deployed()
    let BUSD = network === "mainnet"? IBEP20.at(knownContracts.BUSD[network]):await MockBUSD.deployed();

    let Masterchef = await masterchef.deployed()

    let pairBUSDNut = {
        address: await uniswap.getPair(BUSD.address, Nut.address),
        allocPoint: 4000,
        depoistFee: 0
    }
    let pairWBNBNut = {
        address: await uniswap.getPair(knownContracts.WBNB[network], Nut.address),
        allocPoint: 2400,
        depoistFee: 0
    }

    await Masterchef.add(
        pairBUSDNut.allocPoint,
        pairBUSDNut.address,
        pairBUSDNut.depoistFee,
        false
    )

    await Masterchef.add(
        pairWBNBNut.allocPoint,
        pairWBNBNut.address,
        pairWBNBNut.depoistFee,
        false
    )

    if(network !== "bsc") {
        let pairWBNBBUSD = {
            address: await uniswap.getPair(knownContracts.WBNB[network], BUSD.address),
            allocPoint: 500,
            depoistFee: 400
        }

        await Masterchef.add(
            pairWBNBBUSD.allocPoint,
            pairWBNBBUSD.address,
            pairWBNBBUSD.depoistFee,
            false
        )
    } else {
        for await (const { contractAddress, allocPoint, depositFee } of pools) {
            await Masterchef.add(
                allocPoint,
                contractAddress,
                depositFee
            )
        }
    }
}