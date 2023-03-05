import { Box, Button, Flex, useBoolean, useToast } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { USED_CHAIN } from '@/constants/chain'
import { NFT_COLLECTION } from '@/constants/nftCollection'
import { nftWalletsStore } from '@/store/nftWallet'
import { isAddress } from '@/utils/web3Utils'

import CommonInput from '../CommonInput'

const NftNavigator = () => {
  const [nftIndex, setNftIndex] = useState('0')

  const navigate = useNavigate()

  const whitelistOptions = useMemo(() => {
    return NFT_COLLECTION[USED_CHAIN].map((ele) => ({
      value: ele.address,
      label: ele.name,
    }))
  }, [])
  const [nftAddress, setNftAddress] = useState<string>(whitelistOptions?.[0].value ?? '')

  const safeNFTAddress = isAddress(nftAddress) || AddressZero

  const [useWhitelist, setUseWhitelist] = useBoolean(true)

  const onClickNavigate = useCallback(() => {
    navigate(`/nft/${nftAddress}/${nftIndex}`)
  }, [nftAddress, nftIndex])

  const isValidate = safeNFTAddress !== AddressZero && !isNaN(+nftIndex) && +nftIndex > 0

  const toast = useToast()
  const [isWalletFetching, setWalletFetching] = useBoolean(false)

  async function onConfirm() {
    if (isNaN(+nftIndex)) {
      toast({
        title: 'Invalid index',
        status: 'error',
      })
      return
    }
    try {
      setWalletFetching.on()
      await nftWalletsStore.set.addNFTAddress(safeNFTAddress, +nftIndex)
      onClickNavigate()
    } catch (error) {
      toast({
        title: (error as Error).message,
        status: 'error',
      })
    }
    setWalletFetching.off()
  }

  return (
    <Flex direction="column" gap="20px" justifyContent="center">
      {!useWhitelist ? (
        <CommonInput
          label="NFT Address"
          helperText={
            <Box
              cursor="pointer"
              textDecor="underline"
              _hover={{ textDecoration: 'none' }}
              onClick={setUseWhitelist.toggle}
            >
              Click to create with NFT Collection
            </Box>
          }
          value={nftAddress}
          onChange={(e) => setNftAddress(e.currentTarget.value)}
        />
      ) : (
        <CommonInput
          label="NFT Address"
          helperText={
            <Box
              cursor="pointer"
              textDecor="underline"
              _hover={{ textDecoration: 'none' }}
              onClick={setUseWhitelist.toggle}
            >
              Click to create with NFT Address
            </Box>
          }
          options={whitelistOptions}
          value={nftAddress}
          onChange={(e) => setNftAddress(e.currentTarget.value)}
        />
      )}
      <CommonInput
        label="NFT Index"
        value={nftIndex}
        onChange={(e) => setNftIndex(e.currentTarget.value)}
      />
      <Button
        width="200px"
        isLoading={isWalletFetching}
        isDisabled={!isValidate}
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </Flex>
  )
}

export default NftNavigator
