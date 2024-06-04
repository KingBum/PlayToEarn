import {
    TransactionResponse,
  } from "@ethersproject/abstract-provider";
  import { BigNumber, ethers, Overrides } from "ethers";
  
  export default class BaseInterface {
    _provider: ethers.BrowserProvider;
    _contractAddress: string;
    _abis: ethers.ContractInterface;
    _contract: ethers.Contract;
    _option: Overrides;
  
    constructor(
      provider: ethers.BrowserProvider,
      address: string,
      abi: ethers.ContractInterface
    ) {
      this._provider = provider;
      this._contractAddress = address;
      this._abis = abi;
      this._option = { gasLimit: 1000000 };
      this._contract = new ethers.Contract(address, abi, provider.getSigner());
    }
  
    _handleTransactionResponse = async(tx: TransactionResponse) => {
        const recept = await tx.wait();
        return recept.transactionHash;
    }
  
    _numberToEth = (amount: number) => {
      // console.log("String nưe",)
      return ethers.utils.parseEther(amount.toFixed(8));
    }
  
    _toNumber = (bigNumber: BigNumber) => {
      try {
        return bigNumber.toNumber();
      } catch (er) {      
        return Number.parseFloat(ethers.formatEther(bigNumber));
      }
    };
  
    _toEther = (bigNumber: BigNumber) => {
      return Number.parseFloat(ethers.utils.formatEther(bigNumber));  
    }
  
    _toWei = (amount: number) => {
      return ethers.utils.parseUnits(amount.toString());
    };
  }