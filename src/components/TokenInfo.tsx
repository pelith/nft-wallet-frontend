import { Box, Flex } from '@chakra-ui/react'
import { Zero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import { memo } from 'react'
import { useBalance, useToken } from 'wagmi'

interface ITokenInfoProps {
  walletAddress: `0x${string}`
  tokenAddress?: `0x${string}`
  selected: boolean
  onSelect(params: {
    tokenAddress?: `0x${string}`
    balance: BigNumber
    formatted: string
    symbol: string
    decimals: number
  }): void
}

function TokenInfo({ walletAddress, tokenAddress, selected, onSelect }: ITokenInfoProps) {
  const { data: balanceData } = useBalance({
    address: walletAddress,
    token: tokenAddress,
    cacheTime: 2_000,
    watch: true,
  })
  const { data: tokenData } = useToken({
    address: tokenAddress,
  })

  return (
    <Flex
      gap="10px"
      border={selected ? 'solid 1px black' : ''}
      onClick={() =>
        onSelect({
          tokenAddress,
          balance: balanceData?.value ?? Zero,
          symbol: tokenData?.symbol || 'ETH',
          formatted: balanceData?.formatted ?? '',
          decimals: tokenData?.decimals ?? 18,
        })
      }
      cursor="pointer"
    >
      <Box>name: {tokenData?.name || 'ETH'}</Box>
      <Box>symbol: {tokenData?.symbol || 'ETH'}</Box>
      <Box>balance: {balanceData?.formatted}</Box>
    </Flex>
  )
}

export default memo(TokenInfo)
