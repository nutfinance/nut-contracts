const nut = artifacts.require('NutToken')

const migration = async (deployer, network, accounts) => {
    await Promise.all([deployToken(deployer, network, accounts)])
}


module.exports = migration

// ============ Deploy Functions ============

async function deployToken(deployer, network, accounts) {
  await deployer.deploy(nut);
}
