import { AddressZero, MaxUint256, Zero } from '@ethersproject/constants'
import { BigNumberish } from 'ethers'
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'

import ABINFTWallet from '@/constants/abis/ABINFTWallet'

import { ApprovalState } from './../constants/ApprovalState'

interface IUseTokenApproveProps {
  tokenAddress: `0x${string}`
  NFTWalletAddress?: `0x${string}`
  requiredAllowance: BigNumberish
  spender: `0x${string}`
}

export default function useTokenApprove({
  tokenAddress,
  spender,
  NFTWalletAddress,
  requiredAllowance,
}: IUseTokenApproveProps) {
  const { address } = useAccount()

  const usedAccount =
    NFTWalletAddress && NFTWalletAddress !== AddressZero
      ? NFTWalletAddress
      : address ?? AddressZero
  const { data: approveContractData, config: approveContractConfig } =
    usePrepareContractWrite({
      address: tokenAddress,
      abi: erc20ABI,
      functionName: 'approve',
      args: [spender, MaxUint256],
      enabled: tokenAddress !== AddressZero,
    })
  const { config: NFTWalletApproveConfig } = usePrepareContractWrite({
    address: NFTWalletAddress ?? AddressZero,
    abi: ABINFTWallet,
    functionName: 'execute',
    args: [spender, Zero, (approveContractData?.request?.data || '0x') as `0x${string}`],
    enabled: NFTWalletAddress !== AddressZero,
  })

  const {
    write: approve,
    data: approveTransactionData,
    isLoading: isApprovalLoading,
    isSuccess: isApprovalSuccess,
  } = useContractWrite(
    (usedAccount === address ? approveContractConfig : NFTWalletApproveConfig) as any,
  )
  const { data: allowance, isLoading: isAllowanceLoading } = useContractRead({
    abi: erc20ABI,
    address: tokenAddress,
    functionName: 'allowance',
    args: [usedAccount, spender],
    watch: true,
    cacheTime: 2_000,
    enabled: tokenAddress !== AddressZero,
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
