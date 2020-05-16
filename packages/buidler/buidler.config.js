//let’s make sure we can list our accounts.
//create an accounts() function

//We also added some config at the bottom to allow us to control our compile better and switch between networks. Notice the mnemonic option, this gives us the ability to switch to a wallet we control and not use the accounts built into the chain because we won’t have those in production.

//run npx buidler accounts

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

//____________________________

//npx buidler accounts pulls up a list of local accounts
//balance() function below
// npx buidler balance [address]

task("balance", "Reveals an account's balance")
  .addPositionalParam("account", "The account's addy")
  .setAction(async (taskArgs) => {
    const balance = await web3.eth.getBalance(taskArgs.account);
    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

//send function

task("send", "Send ETH")
  .addParam("from", "From address or account index")
  .addOptionalParam("to", "To address or account index")
  .addOptionalParam("amount", "Amount to send in ether")
  .addOptionalParam("data", "Data included in transaction")
  .addOptionalParam("gasPrice", "Price you are willing to pay in gwei")
  .addOptionalParam("gasLimit", "Limit of how much gas to spend")
  .setAction(async (taskArgs) => {
    let to;
    if (taskArgs.to) {
      to = taskArgs.to;
    }
    let txparams = {
      from: taskArgs.from,
      to: to,
      value: web3.utils.toWei(taskArgs.amount ? taskArgs.amount : "0", "ether"),
      gasPrice: web3.utils.toWei(
        taskArgs.gasPrice ? taskArgs.gasPrice : "1.001",
        "gwei"
      ),
      gas: taskArgs.gasLimit ? taskArgs.gasLimit : "24000",
    };
    if (taskArgs.data !== undefined) {
      txparams["data"] = taskArgs.data;
    }
    return new Promise((resolve, reject) => {
      web3.eth.sendTransaction(txparams, (error, transactionHash) => {
        console.log(`Error: ${error} : transactionHash: ${transactionHash}`);
      });
    });
  });

//example of how to run npx buidler send --from [address] --to [address] --amount 10
