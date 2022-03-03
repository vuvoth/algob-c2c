const { executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/algob/build/runtime");

async function run(runtimeEnv, deployer) {
  const master = deployer.accounts[0];
  const firstApp = deployer.getApp('c2c-call.py', 'clear.teal');
  const secondApp = await deployer.getApp('c2c-echo.py', 'clear.teal');
  console.log(firstApp);
  let fundTx = {
    type: types.TransactionType.TransferAlgo,
    sign: types.SignType.SecretKey,
    fromAccount: master,
    toAccountAddr: firstApp.applicationAccount,
    amountMicroAlgos: 1e6,
    payFlags: {
      totalFee: 1000
    }
  };

  await executeTransaction(deployer, fundTx);
  fundTx.toAccountAddr = secondApp.applicationAccount
  await executeTransaction(deployer, fundTx);
}

module.exports = { default: run };
