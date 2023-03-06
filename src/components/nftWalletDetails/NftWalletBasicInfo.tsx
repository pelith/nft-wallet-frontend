/* eslint-disable no-undef */
import { Box, Divider, Flex, Grid, GridItem } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import { useEffect } from 'react'
import { erc721ABI, useAccount, useContractReads } from 'wagmi'

import useNFTWalletIsDeployed from '@/hooks/useNFTWalletIsDeployed'
import { nftWalletsStore } from '@/store/nftWallet'

import WalletImagePreview from '../WalletImagePreview'

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
  const _index = BigNumber.from(nftId)

  useContractReads({
    contracts: [
      {
        address: nftAddress,
        abi: erc721ABI,
        functionName: 'ownerOf',
        args: [_index],
      },
      {
        address: nftAddress,
        abi: erc721ABI,
        functionName: 'tokenURI',
        args: [_index],
      },
    ],
    enabled: walletInfo.ownedBy === AddressZero || !walletInfo.imgURI,
    watch: true,
    staleTime: 3_000,
    onSettled(data) {
      const [ownedBy, imgURI] = data || []

      nftWalletsStore.set.updateNFTStatusPassive({
        ownedBy,
        imgURI,
        nftAddress,
        id: nftId,
        walletAddress: walletInfo.nftAddress,
      })
    },
  })

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
          <GridItem>{walletInfo.isDeployed ? 'Exist' : 'Does not Exist'}</GridItem>
        </Grid>
      </Flex>
      <Flex h="1.5rem" gap="20px">
        <Box>NFT Wallet Address</Box>
        <Divider orientation="vertical" borderWidth="1px" borderColor="black" />
        <Box>{walletInfo.walletAddress}</Box>
      </Flex>
    </Flex>
  )
}

export default NftWalletBasicInfo
