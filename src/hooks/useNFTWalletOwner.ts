import { useAccount, useContractRead } from 'wagmi'

import ABINFTWallet from '@/constants/abis/ABINFTWallet'
export default function useNFTWalletOwner(walletAddress: string) {
  const account = useAccount()
  const { data, isLoading } = useContractRead({
    address: walletAddress as `0x${string}`,
    abi: ABINFTWallet,
    functionName: 'owner',
  })

  return {
    isOwner: data === account.address,
    isLoading,
  }
}
