'use client'

import { Button, HStack, Image, Text } from "@chakra-ui/react"
import React from "react"
import { numberFormat, showSortAddress } from "@/utils"

interface IProps {
    address?: string
    amount: string
    token : string
}

export default function WalletInfo({ address, amount, token }: IProps) {
    return (
        <Button variant="outline" ml="10px">
            <HStack>
                <Text>{showSortAddress(address)}</Text>
                <Image src="/bnb.png" w="25px" alt="bnb" ml="20px" />
                <Text>{numberFormat(amount)}</Text>
                <Image src="/tokenlogo.png" w="25px" alt="bnb" ml="20px" />
                <Text>{numberFormat(token)}</Text>
            </HStack>
        </Button>
    )
}