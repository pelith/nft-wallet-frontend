import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Center, Grid, GridItem } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import NftWalletBasicInfo from './NftWalletBasicInfo'
import NftWalletTransactionDetail from './NftWalletTransactionDetail'
import TokenBalanceTable from './TokenBalanceTable'

function back() {
  window.history.back()
}

const NftWalletDetails = () => {
  const { nftAddress, nftIndex } = useParams<{ nftAddress: string; nftIndex: string }>()

  return (
    <Grid pos="relative" templateColumns="4fr 3fr" gap={6} pt="50px">
      <Center cursor="pointer" pos="absolute" top="10px" left="0" onClick={back}>
        <ChevronLeftIcon />
        back
      </Center>
      <GridItem>
        <NftWalletBasicInfo nftAddress={nftAddress as `0x${string}`} nftId={+nftIndex!} />
      </GridItem>
      <GridItem>
        <TokenBalanceTable nftWalletKey={`${nftAddress}/${nftIndex}`} />
      </GridItem>
      <GridItem colSpan={2}>
        <NftWalletTransactionDetail />
      </GridItem>
    </Grid>
  )
}

export default NftWalletDetails
