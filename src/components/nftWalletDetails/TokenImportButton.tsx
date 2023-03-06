import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useBoolean,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

import { nftWalletsStore } from '@/store/nftWallet'
import { isAddress } from '@/utils/web3Utils'

export default function TokenImportButton() {
  const [tokenAddress, setTokenAddress] = useState('')

  const toast = useToast()

  const { onOpen, onClose, isOpen } = useDisclosure()

  const [isLoading, setIsLoading] = useBoolean(false)

  const validAddress = isAddress(tokenAddress)
  async function onConfirm() {
    if (!validAddress) return
    setIsLoading.on()
    try {
      await nftWalletsStore.set.addTokenList(validAddress)
      toast({
        title: 'token success imported',
        status: 'info',
        position: 'bottom-right',
      })
      onClose()
    } catch (error) {
      toast({
        title: `Error: ${(error as Error).message}`,
        status: 'error',
      })
    }
    setIsLoading.off()
  }

  return (
    <Popover placement="bottom" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button rounded="1.5rem" size="sm">
          Import Token
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <VStack p="16px 20px">
          <Input
            value={tokenAddress}
            placeholder="please input token address"
            onInput={(e) => setTokenAddress(e.currentTarget.value)}
          />
          <Button isDisabled={!validAddress} onClick={onConfirm} isLoading={isLoading}>
            Confirm
          </Button>
        </VStack>
      </PopoverContent>
    </Popover>
  )
}
