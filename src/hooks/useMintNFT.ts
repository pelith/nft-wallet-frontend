import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

import NFTAbi from '@/constants/abis/ABINFTSample'
import { NFTCollectionInfo } from '@/constants/nftCollection'

export default function useMintNFT(nftAddress: `0x${string}`) {
  const { address } = useAccount()
  const { config } = usePrepareContractWrite({
    address: nftAddress,
    abi: NFTAbi,
    functionName: 'mintTo',
    args: [address!],
    enabled: nftAddress === NFTCollectionInfo.sample.address,
  })

  const { isLoading, isSuccess, data, write } = useContractWrite(config)

  return {
    isLoading: isLoading,
    isSuccess,
    data,
    mintNFT: write,
  } as
    | {
        isLoading: true
        isSuccess: boolean
        data: undefined
        mintNFT: typeof write
      }
    | {
        isLoading: false
        isSuccess: boolean
        data: Exclude<typeof data, undefined>
        mintNFT: typeof write
      }
}
