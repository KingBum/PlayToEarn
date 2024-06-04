'use client'

declare var window: any
import React from 'react'
import { Flex, Heading, SimpleGrid, Spacer, useDisclosure } from '@chakra-ui/react'
import { ConnectWallet, SuccessModal, WalletInfo } from '@/components'
import { IPackage, IRate, IWalletInfo, TOKEN } from '@/_types_'
import { ethers } from 'ethers'
import { packages } from '@/constants'
import InvestCard from './components/InvestCard'
import { useAppSelector } from '@/reduxs/hooks'
import { CrowdSaleContract } from '@/contracts'
import Header from './components/Header'
import Footer from '../../components/Footer'
import Slick from './components/Slick'
import Card from './components/Card'
import Category from './components/Category'

export default function InvestView() {
  // const [wallet, setWallet] = React.useState<IWalletInfo>()
  const [rate, setRate] = React.useState<IRate>({ bnbRate: 0 })
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false)
  const [pak, setPak] = React.useState<IPackage>()
  const [txhash, setTxHash] = React.useState<string>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  // const [web3Provider, setWeb3Provider] = React.useState<ethers.providers.Web3Provider>()
  const { web3Provider, wallet } = useAppSelector((state) => state.account);

  const getRate = React.useCallback(async () => {
    if (!web3Provider) return;
    const crowdContract = CrowdSaleContract(await web3Provider.getSigner())
    const bnbRate = Number(await crowdContract.BNB_rate())
    setRate({ bnbRate })
  }, [])

  React.useEffect(() => {
    getRate()
  }, [getRate])

  // const onConnectMetamask = async () => {
  //   if (window.ethereum) {
  //     const provider = new ethers.providers.Web3Provider(
  //       window.ethereum,
  //       undefined
  //     );
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = provider.getSigner();
  //     const address = await signer.getAddress();
  //     const bigBalance = await signer.getBalance();
  //     const bnbBalance = Number.parseFloat(
  //       ethers.utils.formatEther(bigBalance)
  //     );
  //     setWallet({ address, bnb: bnbBalance });
  //     setWeb3Provider(provider);
  //   }
  // }

  const handleBuyIco = async (pk: IPackage) => {
    if (!web3Provider) return;
    setPak(pk);
    setIsProcessing(true);
    const crowdContract = CrowdSaleContract(await web3Provider.getSigner());
    const covertAmount = pk.amount
    const amount1 = covertAmount / rate.bnbRate
    const hash = await crowdContract.buyTokenByBNB({ value: ethers.parseEther(amount1.toString()) });
    setTxHash(hash.hash);
    onOpen();
    setPak(undefined);
    setIsProcessing(false);
  }
  return (
    <>
      <Header />
      <Heading mt="50px" mb={'20px'} textAlign={'center'}>Invest</Heading>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacingY="20px">

        {packages.map((pk, index) => (

          <InvestCard
            pak={pk}
            key={String(index)}
            isBuying={isProcessing && pak?.key === pk.key}
            rate={rate.bnbRate}
            walletInfo={wallet}
            onBuy={() => handleBuyIco(pk)}
          />
        ))}
      </SimpleGrid>
      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        hash={txhash}
        title='BUY ICO'
      />
      <Heading mt="50px" mb={'20px'} textAlign={'center'}>Hot Item</Heading>

      <Slick />
      <Heading mt="50px" mb={'20px'} textAlign={'center'}>Browse by category</Heading>

      <Category />
    </>

  )
}
