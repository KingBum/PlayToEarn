import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Flex, Text } from '@chakra-ui/react';

interface Color {
    hex: string;
    name: string;
    isClicked: boolean;
}

interface CardsProps {
    level: number;
    gameState: string;
    setGameState: React.Dispatch<React.SetStateAction<string>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    score: number;
}

const Card: React.FC<{ hexCode: string; name: string; handleClick: () => void }> = ({ hexCode, name, handleClick }) => {
    return (
        <Box
            className="card"
            data-color={hexCode}
            onClick={handleClick}
            w="200px"
            h="200px"
            boxShadow="0px 2px 5px 0px rgba(146, 146, 146, 0.75)"
            borderRadius="5px"
            display="flex"
            flexDirection="column"
            cursor="pointer"
        >
            <Box className="color" flex="1" backgroundColor={hexCode}></Box>
            <Text className="color-text" borderBottomLeftRadius="5px" borderBottomRightRadius="5px" padding="10px" textAlign="center" backgroundColor="#FFF" color="red">
                {name}
            </Text>
        </Box>
    );
}

const randomBetween = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

const shuffleArray = (arr: any[]) => {
    let j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
};

const Cards: React.FC<CardsProps> = ({ level, gameState, setGameState, setScore, score }) => {
    const [colorsArray, setColorsArray] = useState<Color[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const generateColorsArray = async (level: number) => {
        setIsLoading(true);
        let newColors: Color[] = [];
        let previousRGBs: string[] = [];
        for (let i = 0; i < level + 3; i++) {
            let r = randomBetween(0, 254);
            let g = randomBetween(0, 254);
            let b = randomBetween(0, 254);
            let rgb = `${r},${g},${b}`;
            while (previousRGBs.includes(rgb)) {
                r = randomBetween(0, 254);
                g = randomBetween(0, 254);
                b = randomBetween(0, 254);
                rgb = `${r},${g},${b}`;
            }
            previousRGBs.push(rgb);
            const response = await axios.get(`https://www.thecolorapi.com/id?rgb=${r},${g},${b}`);
            const data = response.data;
            newColors = [...newColors, { hex: data.hex.value, name: data.name.value, isClicked: false }];
        }
        setColorsArray(newColors);
        setIsLoading(false); 
    };

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const hexCode = (e.currentTarget as HTMLDivElement).dataset.color;
        console.log(colorsArray)
        const array = [...colorsArray];
        array.map((color) => {
            if (color.hex === hexCode) {
                if (color.isClicked) {
                    setGameState('game over');
                } else {
                    color.isClicked = true;
                    setScore(score + 1);
                }
            }
        });
        <CircularProgress isIndeterminate color='green.300' />
        setColorsArray(shuffleArray(array));
        checkIfAllAreClicked() && setGameState('next level');
    };

    const checkIfAllAreClicked = () => {
        for (let i = 0; i < colorsArray.length; i++) {
            if (!colorsArray[i].isClicked) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        generateColorsArray(level);
    }, [level]);

    useEffect(() => {
        gameState === 'new game' && generateColorsArray(level);

        return () => {
            setGameState('');
        };
    }, [gameState, level, setGameState]);

    return (
        <Flex id="cards" justifyContent="center" flexWrap="wrap" gap="15px" maxWidth="1000px" marginBottom="20px">
            {isLoading ? (
                <CircularProgress isIndeterminate color='green.300' />
            ) : (
                    colorsArray.map((color, index) => {
                    //@ts-ignore
                    return <Card key={index} hexCode={color.hex} name={color.name} handleClick={handleCardClick} />;
                })
            )}
        </Flex>
    );
}

export default Cards;
