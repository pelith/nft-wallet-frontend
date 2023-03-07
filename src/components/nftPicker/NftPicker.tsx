import { Button, Center, Flex, Text } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as IconMint } from '../../assets/mint.svg'
import { ReactComponent as IconRegister } from '../../assets/register.svg'

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
    <Flex
      direction="column"
      alignItems="center"
      h="100%"
      justifyContent="space-evenly"
      my="20px"
    >
      <Flex width="100%" justifyContent="space-around">
        <Flex
          direction="column"
          alignItems="center"
          onClick={() => {
            setRegisterRouter(REGISTER_ROUTE.INPUT_EXIST)
          }}
        >
          <Center
            borderRadius="8px"
            w="200px"
            h="200px"
            bg="emerald.tertiary"
            boxSizing="border-box"
            border={
              registerRouter === REGISTER_ROUTE.INPUT_EXIST
                ? '4px solid #FF7AC3'
                : undefined
            }
            mb="16px"
            fontSize="100px"
          >
            <IconRegister />
          </Center>
          <Text>Register/Input NFT</Text>
        </Flex>
        <Flex
          direction="column"
          alignItems="center"
          onClick={() => {
            setRegisterRouter(REGISTER_ROUTE.MINT_NEW)
          }}
        >
          <Center
            borderRadius="8px"
            w="200px"
            h="200px"
            bg="emerald.tertiary"
            boxSizing="border-box"
            fontSize="100px"
            border={
              registerRouter === REGISTER_ROUTE.MINT_NEW ? '4px solid #FF7AC3' : undefined
            }
            mb="16px"
          >
            <IconMint />
          </Center>
          <Text>Mint Demo NFT</Text>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Text>Please select a way to create nft wallet</Text>
        <Button mt="32px" onClick={onClickNavigate}>
          Next
        </Button>
      </Flex>
    </Flex>
  )
}

export default NftPicker
