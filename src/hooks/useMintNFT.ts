import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
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

  const toast = useToast()

  const { isLoading, isSuccess, data, write } = useContractWrite(config)
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Sample NFT success created',
        status: 'success',
        position: 'bottom-right',
      })
    }
  }, [isSuccess])

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
