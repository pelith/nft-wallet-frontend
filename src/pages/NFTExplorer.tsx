import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  useBoolean,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProvider } from 'wagmi'
import { multicall } from 'wagmi/actions'

import ABINFTWallet from '@/constants/abis/ABINFTWallet'
import { isAddress } from '@/utils/web3Utils'

export default function NFTExplorer() {
  const [inputAddress, setInputAddress] = useState('')

  const provider = useProvider()

  const _address = isAddress(inputAddress)

  const toast = useToast()

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useBoolean(false)

  async function onSearch() {
    if (!_address) return
    setIsLoading.on()
    const isDeployed = await provider
      .getCode(_address)
      .then((res) => res !== '0x')
      .catch((err: Error) => {
        toast({
          title: err.message,
          status: 'error',
        })
        return false
      })
    if (!isDeployed) {
      toast({
        title: 'This address not deployed yet',
        status: 'info',
        position: 'bottom-right',
      })
      setIsLoading.off()
      return
    }
    try {
      const [NFTAddress, nftIndex] = await multicall({
        contracts: [
          {
            address: _address,
            abi: ABINFTWallet,
            functionName: 'nft',
          },
          {
            address: _address,
            abi: ABINFTWallet,
            functionName: 'index',
          },
        ],
      })
      navigate(`/nft/${NFTAddress}/${nftIndex.toNumber()}`)
    } catch (error) {
      toast({
        title: (error as Error).message,
        status: 'error',
      })
    }
    setIsLoading.off()
  }

  return (
    <Flex
      pt="50px"
      flexDir="column"
      gap="20px"
      justifyContent="center"
      alignItems="center"
    >
      <Box mb="10%" textAlign="center">
        Explorer
      </Box>

      <Flex h="1.5rem" gap="10px" justifyContent="center" alignItems="center">
        <Text>NFT Wallet address</Text>
        <Divider orientation="vertical" borderColor="blackAlpha.700" />
        <Input
          bg="#D9D9D9"
          placeholder="0x..."
          title="NFT Wallet Address"
          w="30vw"
          size="sm"
          autoComplete="off"
          rounded="1rem"
          autoCorrect="off"
          onChange={(e) => setInputAddress(e.currentTarget.value)}
        />
      </Flex>
      <Button
        w="150px"
        onClick={onSearch}
        isLoading={isLoading}
        size="sm"
        isDisabled={!_address}
      >
        Search
      </Button>
    </Flex>
  )
}
