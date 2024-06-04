'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import { useAppDispatch } from '@/reduxs/hooks';
import { setToken } from "@/reduxs/accounts/account.slices";
import Cookies from 'js-cookie'
import axios from 'axios';


function LoginView() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLoginSuccess = (token: string) => {
        dispatch(setToken(token));
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
                email: email,
                password: password,
            });

            const token = response.data.token;
            Cookies.set('token', token, { expires: 7 })
            handleLoginSuccess(token);
            router.push('/game');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.400'}>Forgot password?</Text>
                            </Stack>
                            <Link href="/register">
                                <Text color={'blue.400'}>Register</Text>
                            </Link>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleLogin}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default LoginView