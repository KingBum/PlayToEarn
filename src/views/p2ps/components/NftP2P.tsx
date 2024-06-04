import { numberFormat } from "@/utils";
import { Clarity, INftItem } from "@/_types_";
import {
    Flex,
    Image,
    Box,
    Text,
    HStack,
    Button,
    VStack,
    Spacer,
    Spinner,
} from "@chakra-ui/react";
import React from "react";
import { ethers } from "ethers";

interface IProps {
    item: INftItem;
    isBuying?: boolean;
    isDisabled?: boolean;
    unClickable?: boolean;
    onAction?: () => void;
}

export default function NftP2P({ item, isBuying, isDisabled, onAction, unClickable }: IProps) {
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
    console.log(unClickable)
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
                <Box position="absolute" top={-3} right={-10}>
                    <Text fontWeight="bold" fontSize="20px" fontStyle="italic">
                        {
                            (item.attributes?.find((p) => p.trait_type === "Rarity")?.value || 'Common') as keyof typeof Clarity
                        }
                    </Text>
                </Box>
                <HStack bg="rgba(0,0,0,0.4)" position="absolute" top={-2} left={-10} px="10px">
                    <Text>ID: {item.id.toString().padStart(5, "0")}</Text>
                </HStack>
            </Box>
            <VStack w="full" alignItems="flex-start">
                <Text fontWeight="bold" py="5px" fontSize="20px" textTransform="uppercase" letterSpacing="5px">
                    {item.name}
                </Text>
                <HStack w="full">
                    <Text color="#fedf5680" fontWeight="bold" fontSize="14px">Price:</Text>
                    <Spacer />
                    <Text color="#fedf56" fontWeight="bold">
                        {/* @ts-ignore */}
                        {numberFormat(ethers.formatEther(item.price.toString()) || 0)} UDA</Text>
                </HStack>
            </VStack>

            <Button
                variant={isBuying || isDisabled ? "outline" : "primary"}
                w="full"
                mt="10px"
                isDisabled={unClickable}
                onClick={onAction}
                disabled={isBuying || isDisabled}
            >
                {isBuying ? <Spinner /> : (isDisabled ? 'Connect wallet' : 'Buy Now')}
            </Button>
        </Flex>
    );
}