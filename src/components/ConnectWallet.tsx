'use client'

import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/button'

interface IProps extends ButtonProps {}
export default function ConnectWallet({...props} : IProps) {
  return <Button variant="primary" {...props}>Connect Wallet</Button>
}
