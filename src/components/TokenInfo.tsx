import { Box } from '@chakra-ui/react'
import { useBalance, useToken } from 'wagmi'

interface ITokenInfoProps {
  walletAddress: `0x${string}`
  tokenAddress: `0x${string}`
}

export default function TokenInfo({ walletAddress, tokenAddress }: ITokenInfoProps) {
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
    <>
      <Box>name: {tokenData?.name}</Box>
      <Box>symbol: {tokenData?.symbol}</Box>
      <Box>balance: {balanceData?.formatted}</Box>
    </>
  )
}
