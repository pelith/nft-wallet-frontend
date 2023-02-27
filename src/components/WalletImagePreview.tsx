import { Image } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'

import useNFTImageLoading from '@/hooks/useNFTImageLoading'
import { isAddress } from '@/utils/web3Utils'

interface IProps {
  nftAddress?: string
  nftId?: number
}

export default function WalletImagePreview({ nftAddress, nftId }: IProps) {
  const { imgURI } = useNFTImageLoading(isAddress(nftAddress) || AddressZero, nftId ?? 0)
  return <Image src={imgURI} fallbackSrc="https://via.placeholder.com/150" />
}
