import { AddressZero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import identity from 'lodash/identity'
import { useMemo } from 'react'
import { erc721ABI, useContractRead, useNetwork } from 'wagmi'

import { NFT_COLLECTION } from '@/constants/nftCollection'

export default function useNFTImageLoading(nftAddress: `0x${string}`, nftId: number) {
  const { chain } = useNetwork()
  const { data: imgURI, isLoading } = useContractRead({
    abi: erc721ABI,
    address: nftAddress,
    functionName: 'tokenURI',
    args: [BigNumber.from(nftId)],
    enabled: nftAddress !== AddressZero,
  })

  const usedLoader = useMemo(() => {
    return (
      NFT_COLLECTION[chain!.id].find((e) => e.address === nftAddress)?.imageLoader ??
      identity
    )
  }, [chain?.id, imgURI])

  return {
    imgURI: (imgURI && usedLoader(imgURI)) || undefined,
    isLoading,
  }
}
