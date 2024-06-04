declare var window: any;
import { ConnectWallet, WalletInfo } from "@/components";
import { menus } from "@/constants";
import { setWalletInfo, setWeb3Provider } from "@/reduxs/accounts/account.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { ethers } from "ethers"; 
import Link from "next/link";
import React, { ReactNode, useEffect } from 'react';
import { getUdaAddress } from "@/contracts/utils/getAddress";
import Footer from "@/components/Footer";

interface IProps {
  children: ReactNode;
}

export default function MainLayout({children}: IProps) {

  const dispatch = useAppDispatch();
  const { wallet } = useAppSelector((state) => state.account);
  
  const getTokenBalance = async (
    walletAddress: string,
    tokenContractAddress: string | undefined
  ) => {
    try {
      const provider = new ethers.BrowserProvider(
        (window as any).ethereum
      );
      const contract = new ethers.Contract(
        tokenContractAddress!,
        ['function balanceOf(address) view returns (uint256)'],
        provider
      );

      const tokenBalance = await contract.balanceOf(walletAddress);
      return ethers.formatEther(tokenBalance)
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  const onConnectMetamask = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(
        window.ethereum,
        undefined
      );
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const bnbBalance = ethers.formatEther(await provider.getBalance(address))
      const tokenBalance = await getTokenBalance(address, getUdaAddress())
      dispatch(setWalletInfo({ address, bnb: bnbBalance, token : tokenBalance}));
      dispatch(setWeb3Provider(provider));
    }
  };

  useEffect(() => {
    onConnectMetamask()
  }, []);

  return (
    <>
      <Flex
      w={{ base: "full", lg: "70%" }}
      flexDirection="column"
      margin="50px auto"
    >
      <Flex w="full" alignItems="center" justifyContent="center">
        <Heading size="lg" fontWeight="bold">
          LOXA
        </Heading>
        <Spacer />
        {menus.map((menu) => <Link href={menu.url} key={menu.url}>
            <span>
              <Text mx="20px" fontSize="20px" textDecoration="underline">{menu.name}</Text>
            </span>
        </Link>)}
      
        {!wallet && (
          <ConnectWallet
            onClick={onConnectMetamask}
          />
        )}
        {wallet && (
          <WalletInfo address={wallet?.address} amount={wallet?.bnb || "0"} token={wallet?.token || "0"} />
        )}
      </Flex>
      <Flex w="full" flexDirection="column" py="50px">
         {children}
      </Flex>   
    </Flex>
      <Footer />
    </>
  );
}