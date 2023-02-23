import { MaxUint256, Zero } from '@ethersproject/constants'
import { BigNumberish } from 'ethers'
import {
  erc20ABI,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'

import ABINFTWallet from '@/constants/abis/ABINFTWallet'

import { ApprovalState } from './../constants/ApprovalState'

export default function useTokenApprove({
  tokenAddress,
  walletAddress,
  requiredAllowance,
}: {
  tokenAddress: `0x${string}`
  walletAddress: `0x${string}`
  requiredAllowance: BigNumberish
}) {
  const { data: contractData } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [walletAddress, MaxUint256],
  })
  const { config } = usePrepareContractWrite({
    address: walletAddress,
    abi: ABINFTWallet,
    functionName: 'execute',
    args: [tokenAddress, Zero, contractData!.request.data! as `0x${string}`],
  })

  const {
    write: approve,
    data: approveTransactionData,
    isLoading: isApprovalLoading,
    isSuccess: isApprovalSuccess,
  } = useContractWrite(config)

  const { data: allowance, isLoading: isAllowanceLoading } = useContractRead({
    abi: erc20ABI,
    address: tokenAddress,
    functionName: 'allowance',
    args: [walletAddress, tokenAddress],
  })

  return {
    approvalState:
      isApprovalLoading || isAllowanceLoading
        ? ApprovalState.LOADING
        : allowance?.gt(requiredAllowance)
        ? ApprovalState.APPROVED
        : ApprovalState.NOT_APPROVED,
    isApprovalSuccess,
    approve,
    approveTransactionData,
  }
}
