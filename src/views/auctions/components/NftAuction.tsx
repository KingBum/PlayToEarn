import { numberFormat } from "@/utils";
import { Clarity, INftItem, ActionType, IAuctionInfo } from "@/_types_";
import {
    Flex,
    Image,
    Box,
    Text,
    HStack,
    SimpleGrid,
    Button,
    VStack,
    Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountDownTimer";
import { useAppSelector } from "@/reduxs/hooks";
import { AuctionContract } from "@/contracts";

interface IProps {
    item: IAuctionInfo;
    isCancel?: boolean;
    onAction?: (action: ActionType) => void;
}

export default function NftAuction({ item, isCancel, onAction }: IProps) {

    const getBackgroundColor = (level: string | number | undefined) => {
        switch (level) {
            case 'Common':
                return '#A9A9A9'; // Dark Gray
            case 'Uncommon':
                return '#0cd70c'; // Green
            case 'Rare':
                return '#4646ff'; // Blue
            case 'Epic':
                return '#bd54ea'; // Purple
            case 'Special':
                return '#FF8000'; // Purple
            default:
                return '#151D14'; // Default color
        }
    };

    const [isFinished, setIsFinished] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const { web3Provider, wallet } = useAppSelector((state) => state.account);

    const handleCountdownFinish = () => {
        setIsFinished(true);
    };

    useEffect(() => {
        if (!web3Provider) return;
        setIsOwner(wallet?.address === item.auctioneer);
    }, [wallet]);

    const finishAuction = (async (auctionID: Number) => {
        if (!web3Provider) return;
        const auctionContract = AuctionContract(await web3Provider.getSigner())
        await auctionContract.finishAuction(auctionID)
    });

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            bg={getBackgroundColor(item.attributes?.find(item => item.trait_type === 'Rarity')?.value)}
            px="10px"
            py="10px"
            borderRadius="10px"
        >
            <Box position="relative">
                <Image
                    src={item.image}
                    alt={item.name}
                    objectFit="cover"
                    borderRadius="10px"
                />
                <Box position="absolute" top={-3} right={0}>
                    <Text fontWeight="bold" fontSize="20px" fontStyle="italic">
                        {
                            (item.attributes?.find((p) => p.trait_type === "Rarity")?.value || 'Common') as keyof typeof Clarity
                        }
                    </Text>
                </Box>
                <HStack bg="rgba(0,0,0,0.4)" position="absolute" top={5} px="10px">
                    <Text>ID: {item.id.toString().padStart(5, "0")}</Text>
                </HStack>
            </Box>
            <VStack w="full" alignItems="flex-start">
                <Text fontWeight="bold" py="10px" fontSize="20px" textTransform="uppercase" letterSpacing="5px">
                    {item.name}
                </Text>
                <HStack w="full">
                    <Text color="#fedf5680" fontWeight="bold" fontSize="14px">Highest bid</Text>
                    <Spacer />
                    <Text color="#fedf56" fontWeight="bold">{numberFormat(item.lastBid)} IPT</Text>
                </HStack>
            </VStack>

            <SimpleGrid w="full" columns={2} spacingX="10px" mt="10px">
                {isFinished && isOwner ? <Button
                    variant={isCancel ? "outline" : "primary"}
                    py="3px !important"
                    onClick={() => finishAuction(item.auctionId)}
                >
                    Finish
                </Button> : <Button variant="outline" disabled>
                    <CountdownTimer targetDate={item.endTime * 1000} onCountdownFinish={handleCountdownFinish} />
                </Button>}

                <Button
                    variant={isCancel ? "outline" : "primary"}
                    py="3px !important"
                    onClick={() => onAction && onAction("AUCTION")}
                >
                    {isCancel ? 'Cancel' : 'Place a bid'}
                </Button>
            </SimpleGrid>
        </Flex>
    );
}