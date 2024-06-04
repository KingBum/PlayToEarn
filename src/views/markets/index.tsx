import { SuccessModal } from "@/components";
import {MarketContract, NFTContract, AuctionContract} from "@/contracts";
import { useAppSelector } from "@/reduxs/hooks";
import { ActionType, IAuctionInfo, INftItem } from "@/_types_";
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Nft from "./components/Nft";
import ProcessingModal from "@/components/ProcessingModal";
import ListModal from "./components/ListModal";
import TransferModal from "./components/TransferModal";
import NftAuction from "../auctions/components/NftAuction";
import { BigNumberish,ethers } from "ethers";
import { _toNumber, cancelAuction, createAuction, getAuctionByStatus, getListNFT, getNFTListedOnMarketplace, getNftAuctionInfo, getNftInfo, listNft, unListNft } from "@/utils";

export default function MarketView() {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const [nfts, setNfts] = React.useState<INftItem[]>([]);
  const [nftsListed, setNftsListed] = React.useState<INftItem[]>([]);
    const [auctions, setAuctions] = React.useState<IAuctionInfo[]>([]);

  const [nft, setNft] = React.useState<INftItem>();
  const [action, setAction] = React.useState<ActionType>();

  const [isProcessing, setIsProcessing] = useBoolean();
  const [isOpen, setIsOpen] = useBoolean();
  const [txHash, setTxHash] = React.useState<string>();
  const [isUnlist, setIsUnList] = useBoolean();
  const [modalType, setModalType] = React.useState<"LISTING" | "AUCTION">(
    "LISTING"
  );

  const [isOpenTransferModal, setOpenTransferModal] =
    React.useState<boolean>(false);

  const {
    isOpen: isSuccess,
    onClose: onCloseSuccess,
    onOpen: onOpenSuccess,
  } = useDisclosure();

  const getListNft = React.useCallback(async () => {
    if (!web3Provider || !wallet) return;
    const nftContract = NFTContract(await web3Provider.getSigner())
    const nfts = await getListNFT(nftContract, wallet.address);
    setNfts(nfts.filter((p) => p.name));

    const marketContract = MarketContract(await web3Provider.getSigner())
    const ids = await getNFTListedOnMarketplace(marketContract);
    const listedNfts = await getNftInfo(nftContract,ids);
    const justOwner = listedNfts.filter((p) => p.author === wallet.address)
    setNftsListed(justOwner);

    const auctionContract = AuctionContract(await web3Provider.getSigner())
    const auctionNfts = await getAuctionByStatus(auctionContract);
    const myAuctions = auctionNfts.filter(
      (p) => p.auctioneer === wallet.address
    );
    const nftAuctions = await getNftAuctionInfo(nftContract,myAuctions);
    setAuctions(nftAuctions);
  }, [web3Provider, wallet]);

  React.useEffect(() => {
    getListNft();
  }, [getListNft]);

  const selectAction = async (ac: ActionType, item: INftItem) => {
    if (!web3Provider) return;
    setNft(item);
    setAction(ac);
    setIsProcessing.off();
    switch (ac) {
      case "LIST":
      case "AUCTION": {
        setModalType(ac === "AUCTION" ? "AUCTION" : "LISTING");
        setIsOpen.on();
        break;
      }
      case "UNLIST": {
        setIsUnList.on();
        const marketContract = MarketContract(await web3Provider.getSigner())
        const tx = await unListNft(marketContract,item.id);
        setTxHash(tx);
        setAction(undefined);
        setNft(undefined);
        setIsUnList.off();
        onOpenSuccess();
        await getListNft();
        break;
      }
      case "TRANSFER": {
        setOpenTransferModal(true);
        break;
      }
      default:
        break;
    }
  };

  const handleListNft = async (price: number, expireDate?: Date | null) => {
    if (!price || !web3Provider || !wallet || !nft) return;
    setIsProcessing.on();
    try {
      const nftContract = NFTContract(await web3Provider.getSigner())
      let tx = "" ;
      if (modalType === "LISTING") {
        const marketContract = MarketContract(await web3Provider.getSigner())
        await nftContract.approve(await marketContract.getAddress(), nft.id);
        //@ts-ignore
        tx = await listNft(marketContract, nft.id, price);
      } else {
        if (!expireDate) return;
        const auctionContract = AuctionContract(await web3Provider.getSigner())
        await nftContract.approve(await auctionContract.getAddress(), nft.id);
        const startTime = Math.round((new Date().getTime() / 1000) + 60);
        //@ts-ignore
        tx = await createAuction(
          auctionContract,
          nft.id,
          price,
          startTime,
          Math.round(expireDate.getTime() / 1000)
        );
      }
      setTxHash(tx);
      onOpenSuccess();
      setAction(undefined);
      setNft(undefined);
      setIsOpen.off();
      await getListNft();
    } catch (er: any) {
      console.log(er);
      setIsProcessing.off();
    }
  };

  const handleTransfer = async (toAddress: string) => {
    setIsProcessing.on();
    try {
      if (!web3Provider || !nft || !wallet) return;
      const nftContract = NFTContract(await web3Provider.getSigner())
      await nftContract.approve(toAddress, nft.id);
      const tx = await nftContract.safeTransferFrom(
        wallet.address,
        toAddress,
        nft.id
      );
      setTxHash(tx);
      setOpenTransferModal(false);
      onOpenSuccess();
      await getListNft();
    } catch (ex) { }
    setIsProcessing.off();
  };

  return (
    <Flex w="full">
      <Tabs>
        <TabList borderBottomColor="#5A5A5A" borderBottomRadius={2} mx="15px">
          <Tab
            textTransform="uppercase"
            color="#5A5A5A"
            _selected={{ borderBottomColor: "white", color: "white" }}
          >
            ITEMS
          </Tab>
          <Tab
            textTransform="uppercase"
            color="#5A5A5A"
            _selected={{ borderBottomColor: "white", color: "white" }}
          >
            active listings
          </Tab>
          <Tab
            textTransform="uppercase"
            color="#5A5A5A"
            _selected={{ borderBottomColor: "white", color: "white" }}
          >
            Live Auctions
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid w="full" columns={4} spacing={10}>
              {nfts.map((nft, index) => (
                <Nft
                  item={nft}
                  key={index}
                  index={index}
                  isAuction
                  isList
                  isTransfer
                  onAction={(a) => selectAction(a, nft)}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
          
          <TabPanel>
            <SimpleGrid w="full" columns={4} spacing={10}>
              {nftsListed.map((nft, index) => (
                <Nft
                  item={nft}
                  key={index}
                  index={index}
                  isUnList
                  onAction={(a) => selectAction(a, nft)}
                />
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid w="full" columns={4} spacing={10}>
              {auctions.map((nft, index) => (
                <NftAuction
                  item={nft}
                  key={index}
                  isCancel
                  onAction={async (a) => {
                    setIsUnList.on();
                    try {
                      //@ts-ignore
                      const auctionContract = AuctionContract(await web3Provider.getSigner())
                      const tx = await cancelAuction(auctionContract,
                        nft.auctionId
                      );
                      setTxHash(tx);
                      onOpenSuccess();
                      await getListNft();
                    } catch (ex) {
                      console.log(ex);
                    }
                    setIsUnList.off();
                  }}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <ProcessingModal isOpen={isUnlist} onClose={() => { }} />
      <ListModal
        type={modalType}
        isOpen={isOpen}
        nft={nft}
        isListing={isProcessing}
        onClose={() => setIsOpen.off()}
        onList={(amount, expireDate) => handleListNft(amount, expireDate)}
      />

      <TransferModal
        isOpen={isOpenTransferModal}
        nft={nft}
        isTransfer={isProcessing}
        onClose={() => setOpenTransferModal(false)}
        onTransfer={(toAddress) => handleTransfer(toAddress)}
      />

      <SuccessModal
        hash={txHash}
        title="SUCCESS"
        isOpen={isSuccess}
        onClose={onCloseSuccess}
      />
    </Flex>
  );
}