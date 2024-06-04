'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAppSelector } from '@/reduxs/hooks';
import { IUser } from '@/_types_';
import Navbar from './components/Navbar';
import Title from './components/Title';
import Stats from './components/Stats';
import Cards from './components/Cards';
import GameOver from './components/GameOver';
import { Alert, AlertIcon, Box, Button, useDisclosure, Text, Center, Heading } from '@chakra-ui/react';
import Cookies from 'js-cookie'
import { useToast } from '@chakra-ui/react';
import { NFTContract } from '@/contracts';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";


let overlayStyle = {
    visibility: 'hidden',
    opacity: '0%'
};

let modalStyle = {
    transform: 'translate(0%, 0%)'
};

interface INFT {
    image: string;
    name: string;
    description: string;
    attributes: { value: string }[];
}

const GameView: React.FC = () => {
    const router = useRouter();
    const hasUser = Cookies.get('token')
    const { token } = useAppSelector((state) => state.account);
    const [level, setLevel] = useState(1);
    const [gameState, setGameState] = useState('');
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [user, setUser] = useState<IUser>();
    const [gameStarted, setGameStarted] = useState(false);
    const { web3Provider, wallet } = useAppSelector((state) => state.account);


    useEffect(() => {
        if (gameStarted) {
            (gameState === 'next level') && setLevel(level + 1);

            if (gameState === 'game over') {
                overlayStyle = {
                    visibility: 'visible',
                    opacity: '100%'
                }
                modalStyle = {
                    transform: 'translate(0%, 50%)'
                }
            } else {
                overlayStyle = {
                    visibility: 'hidden',
                    opacity: '0%'
                }

                modalStyle = {
                    transform: 'translate(0%, 0%)'
                }
            }

            (score > highestScore) && setHighestScore(score);
        }

        return () => {
            setGameState('');
        }
    }, [gameState, level, score, highestScore, gameStarted])

    const resetGame = async () => {
        setGameState('new game');
        setScore(0);
        setLevel(1);
        await updateGameBalance()
    }

    const fetchData = async (token: string) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/user/', {
                headers: {
                    Authorization: `Bearer ${hasUser}`,
                },
            });
            return response.data
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const handleRedirectToLogin = async () => {
        await router.push('/login');
    };

    const fetchDataAndRedirect = async () => {
        if (!token && !hasUser) {
            await handleRedirectToLogin();
        } else {
            try {
                //@ts-ignore
                const userData = await fetchData(hasUser);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    const updateGameBalance = async () => {
        try {
            await axios.put('http://localhost:3000/api/v1/user/', {
                //@ts-ignore
                gameBalance: user.gameBalance - 10,
            }, {
                headers: {
                    Authorization: `Bearer ${hasUser}`,
                },
            });
            fetchDataAndRedirect()
        } catch (error) {
            console.error('Error updating game balance:', error);
        }
    };

    useEffect(() => {
        fetchDataAndRedirect();
    }, []);

    const [toast, setToast] = useState(false);
    const [setNft, setSetNft] = useState<INFT | null>(null);

    useEffect(() => {
        // Hàm kiểm tra và xử lý việc nhận thưởng
        const getAward = async () => {
            if (!web3Provider) return;
            const signer = await web3Provider.getSigner();

            const NftContract = NFTContract(signer)


            // Kiểm tra nếu level từ 5 trở đi và kiểm tra time nữa
            if (level >= 5) {
              
                try {
                    await axios.post('http://localhost:3000/api/v1/user/mint', {
                        //@ts-ignore
                        level: 6,
                        time: 40,
                        to: wallet?.address
                    }, {
                        headers: {
                            Authorization: `Bearer ${hasUser}`,
                        },
                    });
                    setToast(true)
                    NftContract.totalSupply().then((totalSupply) => {
                        NftContract.tokenURI(totalSupply).then((uri) => {
                            axios.get(`${uri}.json`).then((res) => {
                                setSetNft(res.data)
                            })
                        })
                    })
                    onOpen()
                } catch (error) {
                    console.error('Error receiving award:', error);
                }
            }
        };

        // Gọi hàm kiểm tra nhận thưởng khi component được render hoặc khi level thay đổi
        getAward();
    }, [level]);

    const { isOpen, onOpen, onClose } = useDisclosure()

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
        <>
            {/* @ts-ignore */}
            <Navbar user={user} />
            {toast && (<Alert status='success' variant='top-accent'>
                <AlertIcon />
                Conguration !!! I have received the NFT. Check now in your marketplace.
            </Alert>)}
            {setNft &&  
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Chúc mừng bạn đã nhận được 1 NFT</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Center display={"flex"} flexDirection={"column"} borderRadius={"50%"} bg={getBackgroundColor(setNft.attributes[2].value)}><Box>
                        <img src={setNft?.image} alt={setNft?.name} />
                            </Box>
                    <Text fontSize={"20px"}>{setNft.attributes[2].value}</Text>
                            
                            </Center>
                        <Heading color={'#fedf56'}>{setNft.name}</Heading>
                    <Text>{setNft.description}</Text>
                </ModalBody>

                <ModalFooter>
                    <Button variant={"outline"} mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>}
            
            <header>
                <Title />
                <Stats level={level} score={score} highestScore={highestScore} />
            </header>
            <main>
                {gameStarted && ( // Chỉ load game khi game đã được bắt đầu
                    <Cards
                        level={level}
                        gameState={gameState}
                        setGameState={setGameState}
                        setScore={setScore} score={score} />
                )}
            </main>
            <GameOver
                highestScore={highestScore}
                //@ts-ignore
                overlayStyle={overlayStyle}
                modalStyle={modalStyle}
                resetGame={resetGame} />
            {!gameStarted && (
                <Button onClick={() => {
                    setGameStarted(true);
                    // Sau khi bắt đầu game, cập nhật gameBalance
                    updateGameBalance();
                }}>Start</Button>
            )}
        </>
    )
};

export default GameView;
