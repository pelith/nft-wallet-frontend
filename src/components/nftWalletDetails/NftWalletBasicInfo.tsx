/* eslint-disable no-undef */
import { Box, Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
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
      <Flex gap="1rem">
        <Box flex="1">
          <WalletImagePreview nftAddress={nftAddress} nftId={nftId} />
        </Box>
        <Grid
          flex="2"
          templateColumns="2fr auto"
          templateRows="1.7rem"
          gap={2}
          alignContent="center"
          alignItems="center"
          bg="neutral.700"
          p="1rem"
        >
          <GridItem justifySelf="end" whiteSpace="nowrap">
            NFT Address:
          </GridItem>
          <GridItem color="emerald.secondary">{nftAddress}</GridItem>
          <GridItem justifySelf="end">ID:</GridItem>
          <GridItem color="emerald.secondary">{nftId}</GridItem>
          <GridItem justifySelf="end">Owned By:</GridItem>
          <GridItem
            bg={isOwned ? 'emerald.tertiary' : 'transparent'}
            color="emerald.secondary"
          >
            {walletInfo.ownedBy === AddressZero ? '' : walletInfo.ownedBy}
          </GridItem>
          <GridItem justifySelf="end">Status:</GridItem>
          <GridItem color="emerald.secondary">
            <Flex alignItems={'center'}>
              <Text mr="1rem">{isDeployed ? 'Exist' : 'Does not Exist'}</Text>
              {!isDeployed && (
                <CreateWalletButton nftAddress={nftAddress} nftId={nftId} />
              )}
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
      <Flex h="1.5rem" gap="20px" mt="1.5rem">
        <Box>NFT Wallet Address</Box>
        <Divider orientation="vertical" borderWidth="1px" borderColor="emerald.primary" />
        <Box
          flex="1"
          textAlign={'center'}
          borderRadius="8px"
          color="emerald.secondary"
          bg="emerald.tertiary"
        >
          {walletInfo.walletAddress}
        </Box>
      </Flex>
    </Flex>
  )
}

export default NftWalletBasicInfo
