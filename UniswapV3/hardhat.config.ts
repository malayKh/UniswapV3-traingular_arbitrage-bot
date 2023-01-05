import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.7.5",
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/hJs9D-GkS9tuNY6rhonJShgi4oKtQN7d",
      },
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [
        "2e0626c6196e4ea2e21c01d7b85701b63c52e7bb5d05a4a473897a5aae71dace",
      ],
    },
  },
};

export default config;
