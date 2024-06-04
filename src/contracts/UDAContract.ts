// import { ethers } from "ethers";
// import { BaseInterface, Erc20 } from "./interfaces";
// import { getUdaAbi } from "./utils/getAbis";
// import { getUdaAddress } from "./utils/getAddress";
// import { getRPC } from "./utils/common";

// export default class UDAContract extends Erc20 {
  
//   constructor(provider?: ethers.providers.Web3Provider) {
//     const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
//     super(provider || rpcProvider, getUdaAddress(), getUdaAbi());
//     if (!provider) {
//       this._contract = new ethers.Contract(
//         this._contractAddress,
//         this._abis,
//         rpcProvider
//       );
//     }
//   }

// }