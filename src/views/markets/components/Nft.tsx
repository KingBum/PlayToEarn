import { Clarity, INftItem, ActionType } from "@/_types_";
import {
    Flex,
    Image,
    Box,
    Text,
    HStack,
    SimpleGrid,
    Button,
} from "@chakra-ui/react";
import { type } from "os";
import React from "react";


interface IProps {
    item: INftItem;
    index: number;
    isTransfer?: boolean;
    isUnList?: boolean;
    isList?: boolean;
    isAuction?: boolean;
    onAction?: (action: ActionType) => void;
}

export default function Nft({
    item,
    index,
    isTransfer,
    isAuction,
    isList,
    isUnList,
    onAction,
}: IProps) {
    const getBackgroundColor = (level: string | number | undefined)  => {
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
            <Text fontWeight="bold" py="10px">
                {item.name}
            </Text>
            {isList && isAuction && (
                <SimpleGrid w="full" columns={2} spacingX="10px">
                    <Button
                        variant="primary"
                        onClick={() => onAction && onAction("LIST")}
                    >
                        List
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => onAction && onAction("AUCTION")}
                    >
                        Auction
                    </Button>
                </SimpleGrid>
            )}
            {isTransfer && (
                <Button
                    variant="primary"
                    w="full"
                    mt="10px"
                    onClick={() => onAction && onAction("TRANSFER")}
                >
                    Transfer
                </Button>
            )}

            {isUnList && (
                <Button
                    variant="primary"
                    w="full"
                    mt="10px"
                    onClick={() => onAction && onAction("UNLIST")}
                >
                    UnList
                </Button>
            )}
        </Flex>
    );
}