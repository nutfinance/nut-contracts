// const nut = artifacts.require('NutToken')
// const timelock = artifacts.require('Timelock')
// const masterchef = artifacts.require('MasterChef')

// const migration = async (deployer, network, accounts) => {
//     await Promise.all([deployToken(deployer, network, accounts)])
// }


// module.exports = migration

// async function deployToken(deployer, network, accounts) {
//     await deployer.deploy(
//         timelock,
//         accounts[0],
//         86400
//     );

//     let Nut = await nut.deployed()
//     let Masterchef = await masterchef.deployed()

//     Nut.transferOwnership(Masterchef.address)
// }