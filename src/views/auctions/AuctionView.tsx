'use client'

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import { NFTContract, MarketContract, AuctionContract, UDAContract } from "@/contracts";
import { IAuctionInfo, INftItem } from "@/_types_";
import { Flex, SimpleGrid, useBoolean } from "@chakra-ui/react";
import NftAuction from "./components/NftAuction";
import AuctionModal from "./components/AuctionModal";
import { SuccessModal } from "@/components";
import { ethers } from "ethers";
import { getAuctionAddress } from "@/contracts/utils/getAddress";
import { _numberToEth, _toEther,getAuctionByStatus,getNftAuctionInfo,handleTransactionResponse, joinAuction } from "@/utils";





export default function AuctionView() {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const [nfts, setNfts] = React.useState<IAuctionInfo[]>([]);
  const [nftSelected, setNftSelected] = React.useState<IAuctionInfo>();
  const [isOpen, setIsOpen] = useBoolean();
  const [isAuctionSuccess, setIsAuctionSuccess] = React.useState<boolean>(false);

  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [txHash, setTxHash] = React.useState<string>();

  const getListAuctions = React.useCallback(async () => {
    if (!web3Provider) return;
    const auctionContract = AuctionContract(await web3Provider.getSigner())
    const nfts = await getAuctionByStatus(auctionContract);
    
    const nftContract = NFTContract(await web3Provider.getSigner())
    const auctionItems = await getNftAuctionInfo(nftContract,nfts);
    setNfts(auctionItems);
  }, [web3Provider]);

  React.useEffect(() => {
    getListAuctions();
  }, [getListAuctions]);

  const handleAuction = async (bid: number) => {
    if (!web3Provider || !nftSelected) return;
    setIsProcessing(true);
    try {
      const auctionContract = AuctionContract(await web3Provider.getSigner())
      const udaContract = UDAContract(await web3Provider.getSigner())

      await udaContract.approve(getAuctionAddress(), ethers.parseEther(bid.toFixed(8)));
      const tx = await joinAuction(auctionContract, nftSelected.auctionId, bid);
      setTxHash(tx);
      setIsAuctionSuccess(true);
      setIsOpen.off();
      await getListAuctions();
    } catch (ex: any) {
      setIsAuctionSuccess(false);
    }
    setIsProcessing(false);
  }

  

  return (
    <Flex w="full">
      <SimpleGrid columns={4} spacing="20px">
        {nfts.map((nft) => (
          <NftAuction item={nft} key={nft.id} onAction={() => {
            setNftSelected(nft);
            setIsOpen.on()
          }} />
        ))}
      </SimpleGrid>

      <AuctionModal
        isOpen={isOpen}
        isProcessing={isProcessing}
        nft={nftSelected}
        onClose={() => setIsOpen.off()}
        onAuction={(amount) => handleAuction(amount)}
      />

      <SuccessModal
        hash={txHash}
        isOpen={isAuctionSuccess}
        onClose={() => setIsAuctionSuccess(false)}
      />
    </Flex>
  );
}
