'use client';

import React from 'react';
import { Box, Flex, Heading, Text} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export default function Category() {
  const arr = ['Art','Music','Domain Name','Virtual Worlds','Tranding Cards','Collectibles']
  return (
    <Box mt={6}>
      <Flex wrap="wrap" justify="space-between">
        {arr.map((item, index) => (
        <Box key={index}
            width={{ base: '100%', md: '48%', lg: '30%' }}
            bg="rgba(133,100,226,.1)"
            textAlign="center"
            p={8}
            mb={4}
            cursor="pointer"
          >
            <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
              <StarIcon fontSize={40} mb={2} transition={'.3s'} color={'#8364e2'} />
              <Text>{item}</Text>
            </Flex>
          </Box>

        ))}
      </Flex>
    </Box>
  );
}
