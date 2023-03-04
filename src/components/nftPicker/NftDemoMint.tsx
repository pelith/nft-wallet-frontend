import { Button, Flex } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import React, { useEffect } from 'react'
import { useNetwork } from 'wagmi'

import { SAMPLE_NFT_ADDRESS } from '@/constants/nftCollection'
import useMintNFT from '@/hooks/useMintNFT'

const NftNavigator = () => {
  const { chain } = useNetwork()

  const { mintNFT, data, isLoading, isSuccess } = useMintNFT(
    SAMPLE_NFT_ADDRESS[chain!.id] || AddressZero,
  )

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
    }
  }, [isSuccess])

  return (
    <Flex>
      <Button isDisabled={isLoading} onClick={mintNFT}>
        Mint
      </Button>
    </Flex>
  )
}

export default NftNavigator
