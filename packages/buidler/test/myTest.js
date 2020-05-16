// import Web3 from "web3";

const MyContract = artifacts.require("MyContract");
describe("My Dapp", function() {
  let accounts;
  let myContract;
  before(async function() {
    accounts = await web3.eth.getAccounts();
  });
  describe("My Contract", function() {
    it("Should deploy my contract", async function() {
      myContract = await MyContract.new();
    });
    describe("owner()", function() {
      it("Should have an owner equal to the deployer", async function() {
        assert.equal(await myContract.owner(), accounts[0]);
      });
    });
  });
});
