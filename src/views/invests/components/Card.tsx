'use client';

import React from 'react';
import { Box, Image, Flex, Text } from '@chakra-ui/react';

interface CardProps {
  item: {avatar: string, photo: string, title: string, price: string, like: number};  
}

const Card: React.FC<CardProps> = ( {item} ) => {
  return (
    <Box maxW="350px" borderWidth="1px" borderRadius="15px" overflow="hidden"  p={4} m={4}>
      <Box pos="relative">
        <Box pos="absolute" fontSize=".8rem" right="20px" p={2} borderRadius="30px" borderWidth="2px" borderColor="#fedf56" zIndex="1" color="#ccc">
          00d 00h 00m 00s
        </Box>
        <Flex align="center" justify="space-between">
          <Image className="avatar" src={item?.avatar} alt="" boxSize="50px" borderRadius="50%" />
          <i className="fa fa-check stick" />
        </Flex>
        <Box maxH="250px" maxW="300px" mx="auto" my={6}>
          <Image className="imgNFT" src={item?.photo} alt="" borderRadius="8px" />
        </Box>
        <Box pt={6}>
          <Text fontWeight="bold" fontSize="lg" mt={3}>
            {item.title}
          </Text>
          <Flex mt={2} align="center">
            <Text fontWeight="600" fontSize="md" color="#727272">
              {item.price ? item.price : '0.5ETH'}
            </Text>
            <Text ml={2} fontWeight="700" fontSize="md" color="#111">
              1/20
            </Text>
          </Flex>
          <Flex mt={4} align="center" justify="space-between">
            <Text cursor="pointer" fontSize="md" fontWeight="700" color="#fedf56">
              Buy Now
            </Text>
            <Flex align="center">
              <i className="fa-solid fa-heart" style={{ color: '#727272', marginRight: '5px' }} />
              <Text>{item.like}</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
