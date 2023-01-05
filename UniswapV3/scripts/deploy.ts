import { UniswapFlashSwap__factory } from "../typechain-types/factories/contracts/UniswapFlashSwap__factory";
import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const [owner] = await ethers.getSigners();
  const FLASHSWAP = await new UniswapFlashSwap__factory(owner).deploy();
  await FLASHSWAP.deployed();

  console.log("Flashwap deployed at:", FLASHSWAP.address);
  fs.writeFileSync(
    "C:/Users/Admin/Desktop/code/Flashloans/UniswapV3/inputs/botAddress.txt",
    FLASHSWAP.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
