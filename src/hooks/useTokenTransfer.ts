import { Zero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import { erc20ABI, useContractWrite, usePrepareContractWrite } from 'wagmi'

import ABINFTWallet from '@/constants/abis/ABINFTWallet'
export default function useTokenTransfer(
  walletAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
  targetWallet: `0x${string}`,
  value: BigNumber,
) {
  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [targetWallet, value],
  })

  const { config: transferConfig } = usePrepareContractWrite({
    address: walletAddress,
    abi: ABINFTWallet,
    functionName: 'execute',
    args: [tokenAddress, Zero, (config?.request?.data ?? '0x') as `0x${string}`],
  })

  const { writeAsync: transfer, isLoading, isSuccess } = useContractWrite(transferConfig)

  return {
    transfer,
    isLoading,
    isSuccess,
  }
}
