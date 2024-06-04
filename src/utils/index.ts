import { UseToastOptions } from "@chakra-ui/react";
import { TransactionResponse, ethers ,BigNumberish} from "ethers";

export const numberFormat = (number: number | string) => new Intl.NumberFormat().format(Number(number))

export const showSortAddress = (address?: string): string => {
    return `${address?.substring(0,4)}...${address?.substring(
        address.length - 4,
        address.length - 0
    )}`
}

export const showTransactionHash = (tranHash: string) => {
    return  `${tranHash?.substring(0, 10)}${"".padStart(5, '*')}${tranHash?.substring(tranHash.length -10, tranHash.length)}`    
}
  

export const getToast = (description: string | object, status: UseToastOptions["status"] = 'error', title = 'Error'): UseToastOptions => {
    if (typeof description === 'string')
      return { title, status, position: 'top-right', description, duration: 3000 }
    let msg = 'something wrong!';
   // @ts-ignore no problem in operation, although type error appears.
    if (typeof description === 'object' && description['message']) {
    // @ts-ignore no problem in operation, although type error appears.
      msg = description['message'];
    }
    return { title, status, position: 'top-right', description: msg, duration: 3000 } 
}
  
export const handleTransactionResponse = async (tx: TransactionResponse) => {
  const receipt = await tx.wait();
  return receipt?.hash
};

export const _toEther = (arg0: number ) => {
  return Number.parseFloat(ethers.formatEther(arg0)); 
}

export const _numberToEth = (amount: number) => {
  return ethers.parseEther(amount.toFixed(8));
};

export const _toNumber = (bigNumber: BigNumberish) => {
  try {
    return bigNumber.valueOf();
  } catch (er) {      
    return Number.parseFloat(ethers.formatEther(bigNumber));
  }
};

import { cancelAuction, createAuction, getAuctionByStatus, joinAuction } from './Aution';
import { getBnbRate, getUsdtRate, buyTokenByBNB, buyTokenByUSDT } from './CrowdSale';
import { getNFTListedOnMarketplace, getMyNftListed, listNft, unListNft, buyNft } from './Market';
import { listTokenIds, getListNFT, getNftInfo, getNftAuctionInfo } from './NFT';

export { cancelAuction, createAuction, getAuctionByStatus, joinAuction, getBnbRate, getUsdtRate, buyTokenByBNB, buyTokenByUSDT, getNFTListedOnMarketplace, getMyNftListed, listNft, unListNft, buyNft, listTokenIds, getListNFT, getNftInfo, getNftAuctionInfo};