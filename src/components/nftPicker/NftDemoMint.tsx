import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNetwork } from 'wagmi'

import { SAMPLE_NFT_ADDRESS } from '@/constants/nftCollection'
import useMintNFT from '@/hooks/useMintNFT'

const NftDemoMint = () => {
  const { chain } = useNetwork()

  const sampleNftController = useMintNFT(SAMPLE_NFT_ADDRESS[chain!.id] || AddressZero)

  const navigate = useNavigate()

  useEffect(() => {
    if (sampleNftController.isSuccess) {
      navigate(`/#scan-sample`)
    }
  }, [sampleNftController.isSuccess])

  return (
    <Center h="100%">
      <Flex justifyContent="space-around" w="100%">
        <Button
          h="300px"
          w="300px"
          fontSize="46px"
          p="16px"
          wordBreak="break-word"
          isDisabled={sampleNftController.isLoading}
          onClick={sampleNftController.mintNFT}
        >
          <Box lineHeight="1.5">
            Mint
            <br />
            Demo NFT
          </Box>
        </Button>
      </Flex>
    </Center>
  )
}

export default NftDemoMint
