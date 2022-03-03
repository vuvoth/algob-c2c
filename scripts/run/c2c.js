const { executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/algob/build/runtime");

async function run(runtimeEnv, deployer) {
  const master = deployer.accounts[0];
  const firstApp = deployer.getApp('c2c-call.py', 'clear.teal');
  const secondApp = await deployer.getApp('c2c-echo.py', 'clear.teal');
  console.log(firstApp);
  console.log(secondApp);
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
  await executeTransaction(deployer, execParams);
}

module.exports = { default: run };
