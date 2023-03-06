import { useContractRead } from 'wagmi'

import ABINFTWallet from '@/constants/abis/ABINFTWallet'
export default function useNFTWalletOwner(walletAddress: string) {
  const { data, isLoading } = useContractRead({
    address: walletAddress as `0x${string}`,
    abi: ABINFTWallet,
    functionName: 'owner',
    watch: true,
    cacheOnBlock: true,
  })

  return {
    ownedBy: data,
    isLoading,
  }
}
