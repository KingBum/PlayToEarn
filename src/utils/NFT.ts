import { ethers,BigNumberish } from "ethers";
import { _toNumber } from ".";
import { IAuctionInfo, INftItem } from "@/_types_";

// Hàm độc lập để lấy danh sách các token ID của một địa chỉ
export const listTokenIds = async (contract: ethers.Contract, address: string): Promise<number[]> => {
    const urls: BigNumberish[] = await contract.listTokenIds(address);
    const ids = await Promise.all(urls.map((id) => _toNumber(id)));
    //@ts-ignore
    return ids;
};

// Hàm độc lập để lấy danh sách các NFT của một địa chỉ
export const getListNFT = async (contract: ethers.Contract, address: string): Promise<INftItem[]> => {
    const ids = await listTokenIds(contract, address);
    return Promise.all(
        ids.map(async (id) => {
            const tokenUrl = await contract.tokenURI(id);
            const obj = await (await fetch(`${tokenUrl}.json`)).json();
            const item: INftItem = { ...obj, id };
            return item;
        })
    );
};

// Hàm độc lập để lấy thông tin của các NFT
export const getNftInfo = async (contract: ethers.Contract, nfts: any[]): Promise<INftItem[]> => {
    return Promise.all(
        nfts.map(async (o: any) => {
            const tokenUrl = await contract.tokenURI(o.tokenId);
            const obj = await (await fetch(`${tokenUrl}.json`)).json();
            const item: INftItem = { ...obj, id: o.tokenId, author: o.author, price: o.price };
            return item;
        })
    );
};

export const getNftAuctionInfo = async (contract: ethers.Contract, nftsAuctions: IAuctionInfo[]): Promise<IAuctionInfo[]> => {
    return Promise.all(
        nftsAuctions.map(async (o: IAuctionInfo) => {
            const tokenUrl = await contract.tokenURI(o.tokenId);
            const obj = await (await fetch(`${tokenUrl}.json`)).json();
            const item: IAuctionInfo = { ...o, ...obj, id: o.tokenId };
            return item;
        })
    );
};

