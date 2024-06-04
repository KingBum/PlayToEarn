import getChainIdFromEnv, { AddressType, SMART_ADDRESS } from "./common";

const getAddress = (address: AddressType) => {
  const CHAIN_ID = getChainIdFromEnv() as keyof AddressType ;
  return address[CHAIN_ID]
};

export const getCrowdSaleAddress =()=> getAddress(SMART_ADDRESS.CROWD_SALE);
export const getNFTAddress =()=> getAddress(SMART_ADDRESS.NFT);
export const getMarketAddress =()=> getAddress(SMART_ADDRESS.MARKET);
export const getAuctionAddress =()=> getAddress(SMART_ADDRESS.AUCTION);
export const getUdaAddress =()=> getAddress(SMART_ADDRESS.UDA);