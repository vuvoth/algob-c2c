
async function run(runtimeEnv, deployer) {
  const master = deployer.accounts[0];
  const flags = {
    sender: master,
    localBytes: 2,
    globalBytes: 2,
    localInts: 2,
    globalInts: 2
  }

  await deployer.deployApp('c2c-call.py', 'clear.teal', flags, {});
  await deployer.deployApp('c2c-echo.py', 'clear.teal', flags, {});
}

module.exports = { default: run };
