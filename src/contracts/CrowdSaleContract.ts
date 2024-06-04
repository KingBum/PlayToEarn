// import { TransactionResponse, ethers } from "ethers";
// import { BaseInterface } from "./interfaces";
// import { getRPC } from "./utils/common";
// import { getCrowdSaleAbi } from "./utils/getAbis";
// import { getCrowdSaleAddress } from "./utils/getAddress";
// import { Contract } from "ethers";

// const getBnbRate = async (_contract : Contract): Promise<number> => {
//   const rate = await _contract.BNB_rate();
//   return rate.toNumber();
// };

// const buyTokenByBNB = async (_contract : Contract, amount: number) => {
//   const rate = await getBnbRate(_contract);
//   const valueInEth = ethers.parseEther((amount / rate).toString());
//   const tx: TransactionResponse = await _contract.buyTokenByBNB({ value: valueInEth });
//   return _handleTransactionResponse(tx);
// };

// const _handleTransactionResponse = async (tx: TransactionResponse) => {
//   await tx.wait();
//   return tx.hash;
// };

// export {
//   getBnbRate,
//   buyTokenByBNB
// };
