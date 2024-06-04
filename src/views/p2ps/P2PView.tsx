'use client'

import { SuccessModal } from "@/components";
import { UDAContract, MarketContract, NFTContract } from "@/contracts";
import { useAppSelector } from "@/reduxs/hooks";
import { _numberToEth, buyNft, getNftInfo, getToast, handleTransactionResponse, getNFTListedOnMarketplace } from "@/utils";
import {ethers, toNumber} from "ethers"
import { INftItem } from "@/_types_";
import { SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import NftP2P from "./components/NftP2P";
import { getMarketAddress } from "@/contracts/utils/getAddress";


export default function P2PView() {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const toast = useToast();
  const [nfts, setNfts] = React.useState<INftItem[]>([]);
  const [currentNft, setCurrentNft] = React.useState<INftItem>();
  const [txHash, setTxHash] = React.useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const getListedNfts = React.useCallback(async () => {
    try {
      //@ts-ignore
      const marketContract = MarketContract(await web3Provider.getSigner())
      //@ts-ignore
      const nftContract = NFTContract(await web3Provider.getSigner())

      const listedList = await getNFTListedOnMarketplace(marketContract);
      const nftList = await getNftInfo(nftContract, listedList);
      //@ts-ignore
      const justOwner = nftList.filter((p) => p.author !== wallet.address)
      setNfts(nftList);
    } catch (ex) { }
  }, []);


  React.useEffect(() => {
    getListedNfts();
  }, [getListedNfts]);

  const handleBuy = React.useCallback(async (nft: INftItem) => {
    if (!web3Provider || !nft.price) return;
    try {
      setCurrentNft(nft);
      const marketContract = MarketContract(await web3Provider.getSigner())
      const udaContract = UDAContract(await web3Provider.getSigner())
      await udaContract.approve(getMarketAddress(), nft.price);
      const tx = await buyNft(marketContract, nft.id, nft.price);
      setTxHash(tx);
      onOpen();
    } catch (er: any) {
      console.log(er)
      toast(getToast(er));
    }
    setCurrentNft(undefined);
  }, [onOpen, toast, web3Provider]);

  return (
    <>
      <SimpleGrid columns={4} spacing="20px">
        {nfts.map((nft) => (
          <NftP2P
            item={nft}
            key={nft.id}
            // @ts-ignore
            unClickable={nft.author === wallet.address}
            isDisabled={!wallet}
            isBuying={currentNft?.id === nft.id}
            onAction={() => handleBuy(nft)}
          />
        ))}
      </SimpleGrid>
      <SuccessModal
        title="BUY NFT"
        hash={txHash}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}