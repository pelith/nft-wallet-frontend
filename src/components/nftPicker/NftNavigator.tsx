import { Button, Flex } from '@chakra-ui/react'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CommonInput from '../CommonInput'

const NftNavigator = () => {
  const [nftAddress, setNftAddress] = useState('')
  const [nftIndex, setNftIndex] = useState('')

  const isValidate = useMemo(() => nftAddress && nftIndex, [nftAddress, nftIndex])

  const navigate = useNavigate()
  const onClickNavigate = useCallback(() => {
    navigate(`/nft/${nftAddress}/${nftIndex}`)
  }, [nftAddress, nftIndex])

  return (
    <Flex direction="column">
      <Flex direction="column">
        <CommonInput
          label="NFT Address"
          helperText="Create with NFT Collection"
          value={nftAddress}
          onChange={(e) => setNftAddress(e.target.value)}
        />
        <CommonInput
          label="NFT Index"
          value={nftIndex}
          onChange={(e) => setNftIndex(e.target.value)}
        />
      </Flex>

      <Button isDisabled={!isValidate} onClick={onClickNavigate}>
        Confirm
      </Button>
    </Flex>
  )
}

export default NftNavigator
