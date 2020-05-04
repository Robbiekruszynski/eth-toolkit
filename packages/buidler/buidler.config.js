const { usePlugin } = require("@nomiclabs/buidler/config");
usePlugin("@nomiclabs/buidler-truffle5");
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await web3.eth.getAccounts();
  for (const account of accounts) {
    console.log(account);
  }
});
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      /*
      accounts: {
        mnemonic: "SOME MNEMONIC TEXT HERE"
      },*/
    },
  },
  solc: {
    version: "0.6.6",
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
