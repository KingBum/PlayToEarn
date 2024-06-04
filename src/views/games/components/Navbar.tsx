'use client'

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    VStack,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, PhoneIcon, ArrowDownIcon, StarIcon } from '@chakra-ui/icons'
import React, { ChangeEvent, useState } from 'react'
import { IUser } from '@/_types_'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from 'axios'
import { useAppSelector } from '@/reduxs/hooks'
import { getUdaAddress } from '@/contracts/utils/getAddress'
import { getUdaAbi } from '@/contracts/utils/getAbis'
import { Contract, ethers } from 'ethers'
import { UDAContract } from '@/contracts'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

interface Props {
    children: React.ReactNode
}

const NavLink = (props: Props) => {
    const { children } = props

    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={'#'}>
            {children}
        </Box>
    )
}

interface NavbarProps {
    user: IUser;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputValue, setInputValue] = useState<string>('');
    const [currentTab, setCurrentTab] = useState<number>(0);
    const { token, wallet, web3Provider } = useAppSelector((state) => state.account);
    const cookies = Cookies.get('token')
    const router = useRouter();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleConfirm = async () => {
        if (!web3Provider) return;
        const signer = await web3Provider.getSigner();

        const CertificateContract = UDAContract(signer)

        try {
            if (currentTab === 0) {
                const tx = await CertificateContract.transfer(getUdaAddress(), ethers.parseEther(inputValue))
                const receipt = await tx.wait()
                console.log(receipt.hash)
                const response = await axios.post(
                    'http://localhost:3000/api/v1/user/transfer',
                    { amount: inputValue },
                    { headers: { Authorization: `Bearer ${cookies}` } }
                );
                console.log('Response PET to LOXA:', response.data);
            } else if (currentTab === 1) {
                const response = await axios.post(
                    'http://localhost:3000/api/v1/user/convert',
                    { to: wallet?.address, amount: inputValue },
                    { headers: { Authorization: `Bearer ${cookies}` } }
                );
                console.log('Response LOXA to PET:', response.data);
            }
            // Tải lại trang
            window.location.reload();
            // Thực hiện các hành động khác sau khi gọi API thành công (nếu cần)
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi (nếu cần)
        }
    };

    const handleLogout = () => {
        Cookies.remove('token');
        router.push('/login');  // Redirect to the login page after logging out
    };

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} fontSize={'20px'} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            <Text fontWeight={'bold'}>Balance : {user?.gameBalance}</Text>
                            <Button variant={'primary'} padding={'0 3'} onClick={onOpen}>Convert</Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalBody>
                                        <Tabs>
                                            <TabList>
                                                <Tab onClick={() => setCurrentTab(0)}>PET to LOXA</Tab>
                                                <Tab onClick={() => setCurrentTab(1)}>LOXA to PET</Tab>
                                            </TabList>

                                            <TabPanels>
                                                <TabPanel>
                                                    <VStack>
                                                        <InputGroup>
                                                            <InputLeftElement pointerEvents='none'>
                                                                <PhoneIcon color='gray.300' />
                                                            </InputLeftElement>
                                                            <Input placeholder='0' value={inputValue} onChange={handleInputChange} />
                                                        </InputGroup>
                                                        <ArrowDownIcon />
                                                        <InputGroup>
                                                            <InputLeftElement pointerEvents='none'>
                                                                <PhoneIcon color='gray.300' />
                                                            </InputLeftElement>
                                                            <Input variant='filled' placeholder='0' disabled={true} value={inputValue} />
                                                        </InputGroup>
                                                    </VStack>
                                                </TabPanel>
                                                <TabPanel>
                                                    <VStack>
                                                        <InputGroup>
                                                            <InputLeftElement pointerEvents='none'>
                                                                <StarIcon color='gray.300' />
                                                            </InputLeftElement>
                                                            <Input placeholder='0' value={inputValue} onChange={handleInputChange} />
                                                        </InputGroup>
                                                        <ArrowDownIcon />
                                                        <InputGroup>
                                                            <InputLeftElement pointerEvents='none'>
                                                                <StarIcon color='gray.300' />
                                                            </InputLeftElement>
                                                            <Input variant='filled' placeholder='0' disabled={true} value={inputValue} />
                                                        </InputGroup>
                                                    </VStack>
                                                </TabPanel>
                                            </TabPanels>
                                        </Tabs>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button mr={3} padding={5} onClick={onClose}>
                                            Close
                                        </Button>
                                        <Button variant='primary' onClick={handleConfirm} padding={5}>Confirm</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'} ml={10}>
                        <Text mx={3} fontWeight={'bold'}>{user?.name}</Text>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem>
                            </MenuList>
                        </Menu>
                        {user && (<Button ml={5} onClick={handleLogout}>Logout</Button>)}

                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NavLink>Ranking</NavLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>

        </>
    )
}

export default Navbar;