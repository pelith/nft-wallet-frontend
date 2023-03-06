import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

enum REGISTER_ROUTE {
  INPUT_EXIST = 'INPUT_EXIST',
  MINT_NEW = 'MINT_NEW',
}

const NftPicker = () => {
  const [registerRouter, setRegisterRouter] = useState<REGISTER_ROUTE | undefined>(
    undefined,
  )

  const navigate = useNavigate()
  const onClickNavigate = useCallback(() => {
    if (registerRouter === REGISTER_ROUTE.INPUT_EXIST) {
      navigate('/nft-picker/input')
    }
    if (registerRouter === REGISTER_ROUTE.MINT_NEW) {
      navigate('/nft-picker/mint')
    }
  }, [registerRouter])

  return (
    <Flex direction="column" alignItems="center">
      <Flex width="100%" justifyContent="space-around">
        <Flex
          direction="column"
          alignItems="center"
          onClick={() => {
            setRegisterRouter(REGISTER_ROUTE.INPUT_EXIST)
          }}
        >
          <Box
            w="100px"
            h="100px"
            bg="grey"
            boxSizing="border-box"
            border={
              registerRouter === REGISTER_ROUTE.INPUT_EXIST ? '4px solid red' : undefined
            }
            mb="16px"
          />
          <Text>Register/Input NFT</Text>
        </Flex>
        <Flex
          direction="column"
          alignItems="center"
          onClick={() => {
            setRegisterRouter(REGISTER_ROUTE.MINT_NEW)
          }}
        >
          <Box
            w="100px"
            h="100px"
            bg="grey"
            boxSizing="border-box"
            border={
              registerRouter === REGISTER_ROUTE.MINT_NEW ? '4px solid red' : undefined
            }
            mb="16px"
          />
          <Text>Mint Demo NFT</Text>
        </Flex>
      </Flex>
      <Text>Please select a way to create nft wallet</Text>
      <Button mt="16px" onClick={onClickNavigate}>
        Next
      </Button>
    </Flex>
  )
}

export default NftPicker
