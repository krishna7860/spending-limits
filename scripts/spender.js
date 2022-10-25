// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const spender = await hre.ethers.getContractAt(
    "Spender",
    "0x48478c0cd7C6C9D3924204a3164De93c335Fa5A9"
  );

  const allowanceModule = await hre.ethers.getContractAt(
    "AlowanceModule",
    "0xCFbFaC74C26F8647cBDb8c5caf80BB5b32E43134"
  );
  console.log(allowanceModule);

  const allowance = await allowanceModule.getTokenAllowance(
    "0x9370ebDF75ac8f641e404a97c843D40bCc051808",
    "0x48478c0cd7C6C9D3924204a3164De93c335Fa5A9",
    "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33"
  );
  console.log(allowance);

  console.log("Spender deployed to:", spender.address);
  const response = await spender.spend(
    "0x9370ebDF75ac8f641e404a97c843D40bCc051808",
    "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33",
    "0x2fEB7B7B1747f6be086d50A939eb141A2e90A2d7",
    100,
    "0x48478c0cd7C6C9D3924204a3164De93c335Fa5A9",
    ethers.utils.arrayify("0x")
  );
  console.log(response);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
