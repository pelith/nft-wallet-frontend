/* eslint-disable no-undef */
import { Box, Divider, Flex, Grid, GridItem } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

import useNFTWalletIsDeployed from '@/hooks/useNFTWalletIsDeployed'
import { nftWalletsStore } from '@/store/nftWallet'

import WalletImagePreview from '../WalletImagePreview'
import CreateWalletButton from './CreateWalletButton'

type Props = {
  nftAddress: `0x${string}`
  nftId: number
}

const NftWalletBasicInfo = ({ nftAddress, nftId }: Props) => {
  const walletInfo = nftWalletsStore.get.walletInfo(`${nftAddress}/${nftId}`)

  const { address } = useAccount()
  const isOwned = address === walletInfo.ownedBy

  const { isDeployed } = useNFTWalletIsDeployed({
    walletAddress: walletInfo.walletAddress,
  })

  useEffect(() => {
    if (isDeployed) {
      nftWalletsStore.set.updateNFTWalletDeployedMessage({
        nftAddress,
        id: nftId,
        isDeployed,
      })
    }
  }, [isDeployed, nftAddress, nftId])
  return (
    <Flex direction="column">
      <Flex>
        <Box flex="1">
          <WalletImagePreview nftAddress={nftAddress} nftId={nftId} />
        </Box>
        <Grid
          flex="2"
          templateColumns="2fr auto"
          templateRows="1.7rem"
          gap={2}
          alignContent="center"
        >
          <GridItem justifySelf="end" whiteSpace="nowrap">
            NFT Address:
          </GridItem>
          <GridItem>{nftAddress}</GridItem>
          <GridItem justifySelf="end">ID:</GridItem>
          <GridItem>{nftId}</GridItem>
          <GridItem justifySelf="end">Owned By:</GridItem>
          <GridItem bg={isOwned ? '#83F5A3' : 'transparent'}>
            {walletInfo.ownedBy}
          </GridItem>
          <GridItem justifySelf="end">Status:</GridItem>
          <GridItem>
            {isDeployed ? 'Exist' : 'Does not Exist'}
            {!isDeployed && <CreateWalletButton nftAddress={nftAddress} nftId={nftId} />}
          </GridItem>
        </Grid>
      </Flex>
      <Flex h="1.5rem" gap="20px">
        <Box>NFT Wallet Address</Box>
        <Divider orientation="vertical" borderWidth="1px" borderColor="#79ffb5" />
        <Box>{walletInfo.walletAddress}</Box>
      </Flex>
    </Flex>
  )
}

export default NftWalletBasicInfo
