import { ethers } from "hardhat";
import { expect } from "chai";
import { UniswapFlashSwap__factory } from "../typechain-types/factories/contracts/UniswapFlashSwap__factory";
import { UniswapFlashSwap } from "../typechain-types/contracts/UniswapFlashSwap";
import { BigNumber } from "ethers";
const { impersonateFundErc20 } = require("../utils/utilities");

describe("FlashTest", function () {
  let FLASHSWAP: UniswapFlashSwap,
    initialFundingHuman: string,
    BORROW_AMOUNT: BigNumber,
    FUND_AMOUNT: BigNumber,
    DECIMALS: number;

  const DAI_whale = "0x41d30a62582dBFC5f3CD0b9D1176E3889cf38d46";
  const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
  const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f";
  const NII = "0x7c8155909cd385f120a56ef90728dd50f9ccbe52";
  const pool1fee = "100";
  const pool2fee = "10000";
  const pool3fee = "10000";

  beforeEach(async () => {
    // Get owner as signer
    const [owner] = await ethers.getSigners();

    DECIMALS = 18;
    //Establish erc 20 contract
    const tokenBase = await ethers.getContractAt(
      "contracts/interfaces/IERC20.sol:IERC20",
      DAI
    );

    FLASHSWAP = await new UniswapFlashSwap__factory(owner).deploy();
    await FLASHSWAP.deployed();

    // Ensure that the WHALE has a balance
    const whale_balance = await tokenBase.balanceOf(DAI_whale);
    expect(whale_balance).not.equal("0");

    // Configure our Borrowing
    const borrowAmountHuman = "10";
    BORROW_AMOUNT = ethers.utils.parseUnits(borrowAmountHuman, DECIMALS);

    // Configure Funding - FOR TESTING ONLY
    initialFundingHuman = "10";
    FUND_AMOUNT = ethers.utils.parseUnits(initialFundingHuman, DECIMALS);

    // Fund our Contract - FOR TESTING ONLY
    await impersonateFundErc20(
      tokenBase,
      DAI_whale,
      FLASHSWAP.address,
      FUND_AMOUNT.toString()
    );

    await FLASHSWAP.setVariables(
      DAI,
      USDC,
      NII,
      pool1fee,
      pool2fee,
      pool2fee,
      pool3fee
    );
  });
  describe("function 1", () => {
    it("calls swap", async () => {
      console.log(await FLASHSWAP.TOKEN1());
      console.log(await FLASHSWAP.TOKEN2());
      console.log(await FLASHSWAP.TOKEN3());
      console.log(await FLASHSWAP.pool1Fee());
      console.log(await FLASHSWAP.pool2Fee());
      console.log(await FLASHSWAP.pool3Fee());
      await FLASHSWAP.startArbitrage(DAI, BORROW_AMOUNT, { gasLimit: 5000000 });
    });
  });
});
