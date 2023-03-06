import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Button, Center, Flex, Text } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import { parseUnits } from '@ethersproject/units'
import React from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useBalance } from 'wagmi'

import useMultiBalance from '@/actions/useMultiBalance'
import useTokenTransfer from '@/hooks/useTokenTransfer'
import { nftWalletsStore, useNftWalletsStore } from '@/store/nftWallet'
import { isAddress } from '@/utils/web3Utils'

import CommonInput from './CommonInput'

function back() {
  window.history.back()
}

const NftWalletTransfer = () => {
  const { nftAddress, nftIndex } = useParams<{ nftAddress: string; nftIndex: string }>()

  const walletInfo = nftWalletsStore.get.walletInfo(`${nftAddress}/${nftIndex}`)
  const tokens = [...useNftWalletsStore((state) => state.tokenList)]
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [tokenKey, setTokenKey] = useState(0)

  const { data: balances } = useMultiBalance({
    address: walletInfo.walletAddress,
    tokens: tokens.map(([, e]) => e.address),
    watch: true,
    staleTime: 5_000,
    enabled: walletInfo.walletAddress !== AddressZero,
  })

  const { data: nativeBalance } = useBalance({
    address: walletInfo.walletAddress,
    watch: true,
  })

  const combinedFetchBalanceResult = useMemo(() => {
    const newBalances = balances ? [...balances] : []
    if (nativeBalance) {
      newBalances.unshift(nativeBalance)
    }
    return newBalances
  }, [nativeBalance, balances])

  const tokenOptions = useMemo(() => {
    return combinedFetchBalanceResult.map(
      (tokenBalance, i) => ({
        label: tokenBalance.symbol + ':' + tokenBalance.formatted,
        value: `${i}`,
      }),
      [],
    )
  }, [combinedFetchBalanceResult])

  const safeTargetAddress = isAddress(walletAddress) || AddressZero
  const { isLoading, transfer } = useTokenTransfer({
    walletAddress: walletInfo.walletAddress,
    nftAddress: nftAddress as `0x${string}`,
    nftId: +nftIndex!,
    targetWallet: safeTargetAddress,
    value: parseUnits(
      amount || '0',
      combinedFetchBalanceResult[+tokenKey].decimals ?? 18,
    ),
    tokenAddress: tokenKey !== 0 ? tokens[tokenKey - 1]?.[1].address : undefined,
  })

  return (
    <Flex pos="relative" pt="50px">
      <Center
        cursor="pointer"
        pos="absolute"
        top="10px"
        left="0"
        onClick={back}
        mt="16px"
      >
        <ChevronLeftIcon />
        Back
      </Center>
      <Flex direction="column" gap="10px">
        <Text>Transfer with NFT Wallet</Text>
        <CommonInput
          label="Transfer to wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.currentTarget.value)}
        />
        <CommonInput
          label="Asset"
          options={tokenOptions}
          value={tokenKey}
          onChange={(e) => setTokenKey(+e.currentTarget.value)}
        />
        <CommonInput
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.currentTarget.value)}
        />
        <Center>
          <Button
            isDisabled={safeTargetAddress === AddressZero || !amount}
            isLoading={isLoading}
            onClick={transfer}
          >
            Transfer
          </Button>
        </Center>
      </Flex>
    </Flex>
  )
}

export default NftWalletTransfer
