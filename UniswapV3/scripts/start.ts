import { UniswapFlashSwap } from "../typechain-types/contracts/UniswapFlashSwap";
import { BigNumber } from "ethers";
import { UniswapFlashSwap__factory } from "../typechain-types";
import { ethers } from "hardhat";
import fs from "fs";

const pairsArray: string = fs.readFileSync(
  "C:/Users/Admin/Desktop/code/pythonProj/TriArb/UniswapJS/resultArray.json",
  "utf-8"
);

const botAddress = fs.readFileSync(
  "C:/Users/Admin/Desktop/code/Flashloans/UniswapV3/inputs/botAddress.txt",
  "utf-8"
);

async function main(pairsArray: string) {
  const abi = UniswapFlashSwap__factory.abi;
  const [owner] = await ethers.getSigners();
  const FLASHSWAP = await new UniswapFlashSwap__factory(owner).deploy();
  await FLASHSWAP.deployed();

  const pairInfo = JSON.parse(pairsArray)[0];

  const setVariabletx = await FLASHSWAP.setVariables(
    pairInfo["token1Id"],
    pairInfo["token2Id"],
    pairInfo["token3Id"],
    pairInfo["pool1Fee"],
    pairInfo["pool2Fee"],
    pairInfo["pool2Fee"],
    pairInfo["pool3Fee"]
  );

  const borrowAmountHuman = "10";
  const BORROW_AMOUNT = ethers.utils.parseUnits(
    borrowAmountHuman,
    parseInt(pairInfo["token1Decimals"])
  );
  const tx = await FLASHSWAP.startArbitrage(
    pairInfo["token1Id"],
    BORROW_AMOUNT,
    { gasLimit: 10000000 }
  );
  await tx.wait();
  console.log(tx.hash);
}

main(pairsArray).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
