const { executeTransaction, convert } = require("@algo-builder/algob");
const { types } = require("@algo-builder/algob/build/runtime");

async function run(runtimeEnv, deployer) {
  const master = deployer.accounts[0];
  const firstApp = deployer.getApp('c2c-call.py', 'clear.teal');
  const secondApp = await deployer.getApp('c2c-echo.py', 'clear.teal');

  const execParams = {
    type: types.TransactionType.CallApp,
    sign: types.SignType.SecretKey,
    fromAccount: master,
    appID: firstApp.appID,
    foreignApps: [secondApp.appID],
    appArgs: ['str:call_method', `int:${1}`],
    payFlags: {
      totalFee: 2000
    }
  }
  const txReceipt = await executeTransaction(deployer, execParams);
  // decode log 
  console.log(new TextDecoder().decode(txReceipt.logs[0]).slice(4));
}

module.exports = { default: run };
