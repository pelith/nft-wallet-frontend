import { Image } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'

import { USED_CHAIN } from '@/constants/chain'
import { NFT_COLLECTION } from '@/constants/nftCollection'
import useNFTImageLoading from '@/hooks/useNFTImageLoading'
import { isAddress } from '@/utils/web3Utils'

interface IProps {
  nftAddress?: string
  nftId?: number
}

export default function WalletImagePreview({ nftAddress, nftId }: IProps) {
  const { imgURI } = useNFTImageLoading(
    isAddress(nftAddress) || AddressZero,
    nftId ?? 0,
    NFT_COLLECTION[USED_CHAIN].find((ele) => ele.address === nftAddress)?.imageLoader,
  )
  return (
    <Image
      w="150px"
      h="150px"
      objectFit="contain"
      borderRadius="8px"
      src={imgURI}
      fallbackSrc="https://via.placeholder.com/150"
    />
  )
}
