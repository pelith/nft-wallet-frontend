import { AddressZero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'

import NFTFactoryAbi from '@/constants/abis/ABINFTWalletFactory'

import { NFT_FACTORY } from './../constants/nftContract'

export default function useCreateWallet(nftAddress: string, index: number) {
  const { chain } = useNetwork()
  const { config } = usePrepareContractWrite({
    address: NFT_FACTORY[chain!.id] || AddressZero,
    abi: NFTFactoryAbi,
    functionName: 'createWallet',
    args: [nftAddress as `0x${string}`, BigNumber.from(index)],
  })
  const { isLoading, isSuccess, data, write } = useContractWrite(config)

  return {
    isLoading,
    isSuccess,
    data,
    createNFTWallet: write,
  } as
    | {
        isLoading: true
        isSuccess: boolean
        data: undefined
        createNFTWallet: typeof write
      }
    | {
        isLoading: false
        isSuccess: boolean
        data: Exclude<typeof data, undefined>
        createNFTWallet: typeof write
      }
}
