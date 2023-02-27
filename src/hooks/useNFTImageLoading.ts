import { BigNumber } from 'ethers'
import { erc721ABI, useContractRead } from 'wagmi'

export default function useNFTImageLoading(nftAddress: `0x${string}`, nftId: number) {
  const { data: imgURI, isLoading } = useContractRead({
    abi: erc721ABI,
    address: nftAddress,
    functionName: 'tokenURI',
    args: [BigNumber.from(nftId)],
  })

  return {
    imgURI,
    isLoading,
  }
}
