/* eslint-disable no-undef */
import { Box, Divider, Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

import { NFTCollection } from '@/constants/nftCollection'

import WalletImagePreview from '../WalletImagePreview'

type Props = {
  nftData: NFTCollection
}

const NftWalletBasicInfo = ({ nftData }: Props) => {
  return (
    <Flex direction="column">
      <Flex >
        <Box flex="1" >
          <WalletImagePreview nftAddress={nftData.address} nftId={5} />
        </Box>
        <Grid flex="2" templateColumns="1fr 4fr" gap={2}>
          <GridItem w="100%">NFT Address:</GridItem>
          <GridItem w="100%">{'0x'}</GridItem>
          <GridItem w="100%">ID:</GridItem>
          <GridItem w="100%">{'1'}</GridItem>
          <GridItem w="100%">Owned By:</GridItem>
          <GridItem w="100%">{'0x'}</GridItem>
          <GridItem w="100%">Status:</GridItem>
          <GridItem w="100%">{'Exist'}</GridItem>
        </Grid>
      </Flex>
      <Flex>
        <Box flex="1">NFT Wallet Address</Box>
        <Flex flex="2">
          <Divider orientation="vertical" />
          <Box>{'wallet address'}</Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NftWalletBasicInfo
