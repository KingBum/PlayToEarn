import { ethers } from "ethers";
import { _numberToEth, _toNumber, handleTransactionResponse } from ".";

// Hàm độc lập để lấy danh sách các NFT đã được liệt kê trên Marketplace
export const getNFTListedOnMarketplace = async (contract: ethers.Contract): Promise<any[]> => {
    const items = await contract.getListedNft();   
    const nfts = items.map((item: any) => ({ tokenId: _toNumber(item.tokenId), author: item.author, price: _toNumber(item.price) }));
    return nfts;
};

// Hàm độc lập để lấy danh sách các NFT của người dùng đã được liệt kê
export const getMyNftListed = async (contract: ethers.Contract, address: string): Promise<any[]> => {
    const nfts = await getNFTListedOnMarketplace(contract);
    return nfts.filter((p: any) => p.author === address);
};

// Hàm độc lập để liệt kê một NFT
export const listNft = async (contract: ethers.Contract, tokenId: number, price: number) => {
    //@ts-ignore
    const tx = await contract.listNft(tokenId, _numberToEth(price));
    return handleTransactionResponse(tx);
};

// Hàm độc lập để gỡ bỏ một NFT khỏi danh sách
export const unListNft = async (contract: ethers.Contract, tokenId: number) =>  {
    //@ts-ignore
    const tx = await contract.unlistNft(tokenId);
    return handleTransactionResponse(tx);
};

// Hàm độc lập để mua một NFT
export const buyNft = async (contract: ethers.Contract, tokenId: number, price: number) => {
    //@ts-ignore
    const tx = await contract.buyNft(tokenId, price);
    return handleTransactionResponse(tx);
};
