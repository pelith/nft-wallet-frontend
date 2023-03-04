import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

import getRarityImage from '@/utils/getRarityImage'

import NftWalletBasicInfo from './NftWalletBasicInfo'
import NftWalletTransactionDetail from './NftWalletTransactionDetail'
import TokenBalanceTable from './TokenBalanceTable'

const NftWalletDetails = () => {
  return (
    <Grid templateColumns="4fr 3fr" gap={6}>
      <GridItem>
        <NftWalletBasicInfo
          nftData={{
            name: 'Rarity',
            address: '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb',
            imageLoader: getRarityImage,
          }}
        />
      </GridItem>
      <GridItem>
        <TokenBalanceTable tokenList={[]} />
      </GridItem>
      <GridItem colSpan={2}>
        <NftWalletTransactionDetail />
      </GridItem>
    </Grid>
  )
}

export default NftWalletDetails
