import { Box, Flex, Image, Skeleton, useImage } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useBalance } from 'wagmi'

import useMultiBalance from '@/actions/useMultiBalance'
import { USED_CHAIN } from '@/constants/chain'
import { NFT_COLLECTION } from '@/constants/nftCollection'
import { nftWalletsStore } from '@/store/nftWallet'
import { shortenAddress } from '@/utils/web3Utils'

interface IProps {
  nftWalletKey: string
}

export default function NFTPreviewLoader({ nftWalletKey }: IProps) {
  const walletInfo = nftWalletsStore.get.walletInfo(nftWalletKey)
  const loader = NFT_COLLECTION[USED_CHAIN].find(
    (e) => e.address === walletInfo.nftAddress,
  )?.imageLoader
  const src = loader?.(walletInfo.imgURI) ?? (walletInfo.imgURI || '')
  const status = useImage({ src })

  const tokens = nftWalletsStore.get.tokenList()

  const { data: balances } = useMultiBalance({
    address: walletInfo.walletAddress,
    tokens: [...tokens].map(([, e]) => e.address),
  })

  const { data: nativeBalance } = useBalance({
    address: walletInfo.walletAddress,
  })

  const navigate = useNavigate()

  return (
    <Flex
      cursor="pointer"
      flexDir="column"
      gap="10px"
      _hover={{
        border: 'dashed 1px black',
      }}
      p="10px"
      border="solid 1px transparent"
      onClick={() => navigate(`/nft/${nftWalletKey}`)}
    >
      <Skeleton w="150px" h="150px" isLoaded={status === 'loaded' || status === 'failed'}>
        <Image src={src} w="150px" h="150px" objectFit="contain"></Image>
      </Skeleton>
      <Box cursor="pointer">
        {shortenAddress(walletInfo.nftAddress)}: {walletInfo.id}
      </Box>
      <Box>
        <Box>{`${nativeBalance?.value} ${nativeBalance?.symbol}`}</Box>
        {balances?.map((price) => (
          <Box key={price.symbol}>
            {price.formatted} {price.symbol}
          </Box>
        ))}
      </Box>
    </Flex>
  )
}
