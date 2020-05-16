//let’s make sure we can list our accounts.
//create an accounts() function

//We also added some config at the bottom to allow us to control our compile better and switch between networks. Notice the mnemonic option, this gives us the ability to switch to a wallet we control and not use the accounts built into the chain because we won’t have those in production.

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

      accounts: {
        mnemonic: "SOME MNEMONIC TEXT HERE",
      },
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

//npx buidler accounts pulls up a list of local accounts

//balance() function below

task("balance", "Reveals an account's balance")
  .addPositionalParam("account", "The account's addy")
  .setAction(async (taskArgs) => {
    const balance = await web3.eth.getBalance(taskArgs.account);
    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });
