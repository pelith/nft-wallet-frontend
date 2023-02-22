import { AddressZero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import { readContract } from 'wagmi/actions'

import NFTFactoryAbi from '@/constants/abis/ABINFTWalletFactory'
import { ChainId } from '@/constants/chain'
import { NFT_FACTORY } from '@/constants/nftContract'

const NFTFactoryContract = {
  abi: NFTFactoryAbi,
}

export async function getNFTWalletAddress({
  nftAddress,
  index,
  chainId,
}: {
  // eslint-disable-next-line no-undef
  nftAddress: DEFAULT_HASH_ADDRESS
  index: number
  chainId: ChainId
}) {
  if (!NFT_FACTORY[chainId]) return AddressZero
  const data = await readContract({
    ...NFTFactoryContract,
    address: NFT_FACTORY[chainId],
    functionName: 'getWalletAddressByNFT',
    args: [nftAddress, BigNumber.from(index)],
  })

  return data
}
