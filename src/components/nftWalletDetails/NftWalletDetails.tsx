import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Center, Grid, GridItem } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { nftWalletsStore } from '@/store/nftWallet'
import { isAddress } from '@/utils/web3Utils'

import NftWalletBasicInfo from './NftWalletBasicInfo'
import NftWalletTransactionDetail from './NftWalletTransactionDetail'
import TokenBalanceTable from './TokenBalanceTable'

function back() {
  window.history.back()
}

const NftWalletDetails = () => {
  const { nftAddress = '', nftIndex = '' } = useParams<{
    nftAddress: string
    nftIndex: string
  }>()

  useEffect(() => {
    const safeNFTAddress = isAddress(nftAddress) || AddressZero
    const walletInfo = nftWalletsStore.get.walletInfo(`${nftAddress}/${nftIndex}`)
    const isValidate =
      safeNFTAddress !== AddressZero &&
      !isNaN(+nftIndex) &&
      +nftIndex > 0 &&
      walletInfo.nftAddress === AddressZero

    if (isValidate) {
      nftWalletsStore.set.addNFTAddress(safeNFTAddress, +nftIndex)
    }
  }, [])

  return (
    <Grid pos="relative" templateColumns="4fr 3fr" gap={6} pt="70px">
      <Center
        cursor="pointer"
        pos="absolute"
        top="10px"
        left="0"
        onClick={back}
        my="16px"
      >
        <ChevronLeftIcon />
        Back
      </Center>
      <GridItem>
        <NftWalletBasicInfo nftAddress={nftAddress as `0x${string}`} nftId={+nftIndex!} />
      </GridItem>
      <GridItem>
        <TokenBalanceTable nftWalletKey={`${nftAddress}/${nftIndex}`} />
      </GridItem>
      <GridItem colSpan={2}>
        <NftWalletTransactionDetail
          nftAddress={nftAddress as `0x${string}`}
          nftId={+nftIndex!}
        />
      </GridItem>
    </Grid>
  )
}

export default NftWalletDetails
