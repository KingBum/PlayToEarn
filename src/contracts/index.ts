import { Contract, ethers } from 'ethers'
import { getAuctionAbi, getCrowdSaleAbi, getMarketAbi, getNFTAbi, getUdaAbi } from "./utils/getAbis"
import { getAuctionAddress, getCrowdSaleAddress, getMarketAddress, getNFTAddress, getUdaAddress} from "./utils/getAddress"

const AuctionContract = (provider: ethers.Signer) => new Contract(getAuctionAddress(), getAuctionAbi(), provider)
const CrowdSaleContract = (provider: ethers.Signer) => new Contract(getCrowdSaleAddress(), getCrowdSaleAbi(), provider)
const MarketContract = (provider: ethers.Signer) => new Contract(getMarketAddress(), getMarketAbi(), provider)
const NFTContract = (provider: ethers.Signer) => new Contract(getNFTAddress(), getNFTAbi(), provider)
const UDAContract = (provider: ethers.Signer) => new Contract(getUdaAddress(), getUdaAbi(), provider)

export {
    UDAContract,
    NFTContract,
    MarketContract,
    CrowdSaleContract,
    AuctionContract
}

