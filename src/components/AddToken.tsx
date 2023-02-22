import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useState } from 'react'

import { useNFTWalletStore } from '@/store'
import { isAddress } from '@/utils/web3Utils'

export default function AddTokenArea() {
  const importTokenList = useNFTWalletStore((state) => state.importTokenList)

  const [tokenAddress, setInput] = useState('')

  const isDisabled = !isAddress(tokenAddress)

  function onClick() {
    importTokenList([tokenAddress])
    setInput('')
  }

  return (
    <Flex flexDir="column" flex="1 1" width="300px" gap="8px">
      <FormControl>
        <FormLabel>Input token address: </FormLabel>
        <Input onInput={(e) => setInput(e.currentTarget.value)} />
      </FormControl>
      <Button isDisabled={isDisabled} onClick={onClick}>
        add token
      </Button>
    </Flex>
  )
}
