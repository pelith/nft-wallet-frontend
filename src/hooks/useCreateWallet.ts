import { AddressZero } from '@ethersproject/constants'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'

import NFTFactoryAbi from '@/constants/abis/ABINFTWalletFactory' assert { type: 'json' }

import { NFT_FACTORY } from './../constants/nftContract'

export default function useCreateWallet(nftAddress: string, index: number) {
  const { chain } = useNetwork()
  const { config } = usePrepareContractWrite({
    address: NFT_FACTORY[chain!.id] || AddressZero,
    abi: NFTFactoryAbi,
    functionName: 'createWallet',
    args: [nftAddress as `0x${string}`, BigInt(index)],
  })
  const { isLoading, isSuccess, data, write } = useContractWrite(config)

  return {
    isLoading,
    isSuccess,
    data,
    createNFT: write,
  } as
    | {
        isLoading: true
        isSuccess: boolean
        data: undefined
        createNFT: typeof write
      }
    | {
        isLoading: false
        isSuccess: boolean
        data: Exclude<typeof data, undefined>
        createNFT: typeof write
      }
}
