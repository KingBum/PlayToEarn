import { BigNumber, ethers } from "ethers";
import { INftItem } from "@/_types_";
import { getRPC } from "./utils/common";
import { getNFTAbi } from "./utils/getAbis";
import { getNFTAddress } from "./utils/getAddress";
import { useAppSelector } from "@/reduxs/hooks";
import { NFTContract } from "./index";

const { web3Provider, wallet } = useAppSelector((state) => state.account);

const _contract = NFTContract(web3Provider.getSigner());

const _toNumber = async (value: BigNumber) => {
  return value.toNumber();
};

const _listTokenIds = async (address: string) => {
  const urls: BigNumber[] = await _contract.listTokenIds(address);
  const ids = await Promise.all(urls.map(id => _toNumber(id)));
  return ids;
};

const getListNFT = async (address: string): Promise<INftItem[]> => {
  const ids = await _listTokenIds(address);
  return Promise.all(
    ids.map(async (id) => {
      const tokenUrl = await _contract.tokenURI(id);
      const obj = await (await fetch(`${tokenUrl}.json`)).json();
      const item: INftItem = { ...obj, id };
      return item;
    })
  );
};

const getNftInfo = async (nfts: Array<any>) => {
  return Promise.all(
    nfts.map(async (o: any) => {
      const tokenUrl = await _contract.tokenURI(o.tokenId);
      const obj = await (await fetch(`${tokenUrl}.json`)).json();
      const item: INftItem = { ...obj, id: o.tokenId, author: o.author, price: o.price };
      return item;
    })
  );
};

const getNftAuctionInfo = async (nftsAuctions: IAuctionInfo[]) => {
  return Promise.all(
    nftsAuctions.map(async (o: IAuctionInfo) => {
      const tokenUrl = await _contract.tokenURI(o.tokenId);
      const obj = await (await fetch(`${tokenUrl}.json`)).json();
      const item: IAuctionInfo = { ...o, ...obj, id: o.tokenId };
      return item;
    })
  );
};

export {
  getListNFT,
  getNftInfo,
  getNftAuctionInfo
};
