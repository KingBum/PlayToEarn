import { ethers } from "ethers";
import { _toEther, _toNumber, _numberToEth, handleTransactionResponse } from ".";
import { IAuctionInfo } from "@/_types_";


export const getAuctionByStatus = async (contract: ethers.Contract): Promise<IAuctionInfo[]> => {
    const rs = await contract.getAuctionByStatus(true);
    const results: IAuctionInfo[] = [];
    for (let i = 0; i < rs.length; i += 1) {
        const o = rs[i];
        const item: IAuctionInfo = {
            auctioneer: o[0],
            tokenId: Number(o[1]),
            initialPrice: _toEther(o[2]),
            previousBidder: o[3],
            lastBid: _toEther(o[4]),
            lastBidder: o[5],
            startTime: Number(o[6]),
            endTime: Number(o[7]),
            completed: o[8],
            active: o[9],
            id: Number(o[1]),
            image: "",
            auctionId: Number(o[10]),
        };
        results.push(item);
    }
    return results;
  };

export const createAuction = async (contract: ethers.Contract, tokenId: number, initialPrice: number, startTime: number, endTime: number) => {
    //@ts-ignore
    const tx = await contract.createAuction(tokenId, _numberToEth(initialPrice), startTime, endTime);
    return handleTransactionResponse(tx);
};

export const cancelAuction = async (contract: ethers.Contract, auctionId: number) => {
    //@ts-ignore
    const tx = await contract.cancelAuction(auctionId);
    return handleTransactionResponse(tx);
};

export const joinAuction = async (contract: ethers.Contract, auctionId: number, bid: number) => {
    //@ts-ignore
    const tx = await contract.joinAuction(auctionId, _numberToEth(bid));
    return handleTransactionResponse(tx);
};