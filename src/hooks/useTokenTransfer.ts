import { useToast } from '@chakra-ui/react'
import { Zero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import { useEffect } from 'react'
import { erc20ABI, useContractWrite, usePrepareContractWrite } from 'wagmi'

import ABINFTWallet from '@/constants/abis/ABINFTWallet'
import { statusValidate } from '@/utils'
export default function useTokenTransfer(
  walletAddress: `0x${string}`,
  targetWallet: `0x${string}`,
  value: BigNumber,
  tokenAddress?: `0x${string}`,
) {
  const isNativeTokenTransfer = !tokenAddress

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
    args: [
      isNativeTokenTransfer ? targetWallet : tokenAddress,
      isNativeTokenTransfer ? value : Zero,
      isNativeTokenTransfer ? '0x' : ((config?.request?.data ?? '0x') as `0x${string}`),
    ],
  })

  const { writeAsync: transfer, isLoading, status } = useContractWrite(transferConfig)

  const toast = useToast()

  useEffect(() => {
    let _status = statusValidate(status)
    if (_status) {
      const id = toast({
        title: `transfer ${status}`,
        status: _status as 'success' | 'loading' | 'error',
      })

      return () => {
        toast.close(id)
      }
    }
    console.log(statusValidate(status))
  }, [status])

  return {
    transfer,
    isLoading,
    status,
  }
}
