const fs = require("fs");
const chalk = require("chalk");
async function main() {
  const MyContract = artifacts.require("MyContract");
  const myContract = await MyContract.new();
  console.log("MyContract deployed to:", chalk.green(myContract.address));
  fs.writeFileSync("artifacts/MyContract.address", myContract.address);
  //  put your MetaMask account here so you will own the contract:
  let newOwner = "0x1CEb4c4E01fba4C8A4513bca2929f3C68715514D";
  console.log("Updating owner to " + chalk.magenta(newOwner));
  await myContract.updateOwner(newOwner);
  //this is for after you make your contract a token:
  console.log("Sending some tokens to the new owner too...");
  await myContract.transfer(newOwner, "" + 10 * 10 ** 18);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
