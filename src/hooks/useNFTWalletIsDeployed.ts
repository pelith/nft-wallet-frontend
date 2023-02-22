import { AddressZero } from '@ethersproject/constants'
import { useMemo } from 'react'
import { useContractRead, useNetwork } from 'wagmi'

import NFTFactoryAbi from '@/constants/abis/ABINFTWalletFactory'
import { ChainId } from '@/constants/chain'
import { NFT_FACTORY } from '@/constants/nftContract'
import { isAddress } from '@/utils/web3Utils'

const NFTFactoryContract = {
  abi: NFTFactoryAbi,
}

export default function useNFTWalletIsDeployed({
  walletAddress,
  chainId,
}: {
  walletAddress: string
  chainId?: ChainId
}) {
  const usedWalletAddress = useMemo(() => {
    if (isAddress(walletAddress)) return walletAddress as `0x${string}`
    return AddressZero
  }, [walletAddress])
  const { chain } = useNetwork()
  const { data, isError, isLoading, refetch } = useContractRead({
    ...NFTFactoryContract,
    address: NFT_FACTORY[chainId ?? chain!.id] ?? AddressZero,
    functionName: 'getDeployedWalletInfo',
    args: [usedWalletAddress],
    cacheOnBlock: true,
  })

  return {
    data: data?.nft && data.nft !== AddressZero ? data : false,
    isError,
    isLoading,
    refetch,
  }
}
