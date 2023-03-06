import { AddressZero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import { erc721ABI } from 'wagmi'
import { multicall } from 'wagmi/actions'

import ABINFTWalletFactory from '@/constants/abis/ABINFTWalletFactory'
import { USED_CHAIN } from '@/constants/chain'
import { NFT_FACTORY } from '@/constants/nftContract'
import { wagmiClient } from '@/wagmiConfigure'
type NFTWalletInfo = {
  id: number
  nftAddress: `0x${string}`
  walletAddress: `0x${string}`
  imgURI: string
  ownedBy: `0x${string}`
  isDeployed: boolean
}
export default async function readNFTWalletInfo(
  nftAddress: `0x${string}`,
  nftId: number,
): Promise<NFTWalletInfo> {
  const result: NFTWalletInfo = {
    id: nftId,
    nftAddress,
    walletAddress: AddressZero,
    imgURI: '',
    ownedBy: AddressZero,
    isDeployed: false,
  }
  try {
    const _orderIndex = BigNumber.from(nftId)
    const [walletAddress, ownedBy, imgURI] = await multicall({
      contracts: [
        {
          address: NFT_FACTORY[USED_CHAIN],
          abi: ABINFTWalletFactory,
          functionName: 'getWalletAddressByNFT',
          args: [nftAddress, _orderIndex],
        },
        {
          address: nftAddress,
          abi: erc721ABI,
          functionName: 'ownerOf',
          args: [_orderIndex],
        },
        {
          address: nftAddress,
          abi: erc721ABI,
          functionName: 'tokenURI',
          args: [_orderIndex],
        },
      ],
    })

    result.walletAddress = walletAddress
    ownedBy && (result.ownedBy = ownedBy)
    imgURI && (result.imgURI = imgURI)

    const isDeployed = await wagmiClient
      .getProvider({ chainId: USED_CHAIN })
      .getCode(walletAddress)
      .then((res) => {
        return res !== '0x'
      })
      .catch(() => false)
    result.isDeployed = isDeployed
  } catch (error) {
    console.error(error)
  }
  return result
}
