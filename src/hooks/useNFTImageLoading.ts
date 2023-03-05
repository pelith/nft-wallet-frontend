import { AddressZero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import identity from 'lodash/identity'
import { useMemo } from 'react'
import { erc721ABI, useContractRead } from 'wagmi'

export default function useNFTImageLoading(
  nftAddress: `0x${string}`,
  nftId: number,
  loader?: (val: string) => string,
) {
  const { data: imgURI, isLoading } = useContractRead({
    abi: erc721ABI,
    address: nftAddress,
    functionName: 'tokenURI',
    args: [BigNumber.from(nftId)],
    enabled: nftAddress !== AddressZero,
  })

  const usedLoader = useMemo(() => {
    return loader ?? identity
  }, [loader, imgURI])

  return {
    imgURI: (imgURI && usedLoader(imgURI)) || undefined,
    isLoading,
  }
}
