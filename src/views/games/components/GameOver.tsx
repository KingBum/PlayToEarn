import { Box, Button, Text } from '@chakra-ui/react';

interface GameOverProps {
    highestScore: number;
    overlayStyle: React.CSSProperties;
    modalStyle: React.CSSProperties;
    resetGame: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ highestScore, overlayStyle, modalStyle, resetGame }) => {
    return (
        <Box id="overlay" style={overlayStyle} position="fixed" left="0" right="0" top="0" bottom="0" width="100%" height="100%" backgroundColor="rgba(0, 0, 0, 0.5)" zIndex="2" display="flex" justifyContent="center" transition="0.2s opacity ease-in-out">
            <Box id="game-over-modal" style={modalStyle} backgroundColor="rgb(238, 238, 238)" color="rgb(32, 32, 32)" maxHeight="220px" padding="20px" borderRadius="5px" display="flex" flexDirection="column" alignItems="center" gap="20px" transition="0.2s transform ease-in-out">
                <Text as="h2">You lost...</Text>
                <Text as="h3">Highest Score: {highestScore}</Text>
                <Text>You clicked the same colour twice.</Text>
                <Button onClick={resetGame} variant="primary">Try Again</Button>
            </Box>
        </Box>
    );
}

export default GameOver;
