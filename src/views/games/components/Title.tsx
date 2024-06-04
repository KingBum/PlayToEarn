import { Box, Heading } from '@chakra-ui/react';

export default function Title() {
    return (
        <Box className="title" paddingTop="10px">
            <Heading as="h1" fontSize="3.5rem" fontWeight="900" textAlign="center">
                <span className="first-part" style={{backgroundImage: 'linear-gradient(to right, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)', backgroundSize: '100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', MozBackgroundClip: 'text'}}>Colour</span>
                <span className="second-part" style={{WebkitTextFillColor: 'transparent', WebkitTextStroke: '2px #86A8E7'}}>Memo</span>
            </Heading>
        </Box>
    )
}
