import { Button, Center, Flex } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNetwork } from 'wagmi'

import { SAMPLE_NFT_ADDRESS } from '@/constants/nftCollection'
import useMintNFT from '@/hooks/useMintNFT'

const NftNavigator = () => {
  const { chain } = useNetwork()

  const sampleNftController = useMintNFT(SAMPLE_NFT_ADDRESS[chain!.id] || AddressZero)

  const navigate = useNavigate()

  useEffect(() => {
    if (sampleNftController.isSuccess) {
      navigate(`#sample`)
    }
  }, [sampleNftController.isSuccess])

  return (
    <Center h="100%">
      <Flex justifyContent="space-around" w="100%">
        <Button
          h="300px"
          w="300px"
          isDisabled={sampleNftController.isLoading}
          onClick={sampleNftController.mintNFT}
        >
          Mint Demo NFT
        </Button>
      </Flex>
    </Center>
  )
}

export default NftNavigator
