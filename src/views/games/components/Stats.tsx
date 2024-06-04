import { Box, Flex, Heading, Text, Divider } from '@chakra-ui/react';

interface StatsProps {
    level: number;
    score: number;
    highestScore: number;
}

const Stats: React.FC<StatsProps> = ({ level, score, highestScore }) => {
    return (
        <Flex id="stats" flexDirection="column" alignItems="center" marginTop="25px" gap="10px" color="white">
            <Heading as="h2">Level: {level}</Heading>
            <Flex gap={"20px"}>
                <Text as="h3" fontWeight="500">Score: {score}</Text>
                <Text as="h3" fontWeight="500">Highest Score: {highestScore}</Text>
            </Flex>
            <Divider width="100%" borderRadius="10px" height="5px" background="linear-gradient(to right, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)" border="none" />
        </Flex>
    );
}

export default Stats;
