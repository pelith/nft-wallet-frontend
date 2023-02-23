import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import { useState } from 'react'
import { useNetwork } from 'wagmi'

import useCreateWallet from '@/hooks/useCreateWallet'
import useNFTWalletIsDeployed from '@/hooks/useNFTWalletIsDeployed'
import { getNFTWalletAddress } from '@/utils/getNFTWalletInfo'
import { isAddress } from '@/utils/web3Utils'

interface IFindWalletModalProps {
  setNFTWalletAddress(val: string): void
}

interface IButtonOfCreateWalletProps {
  nftAddress: string
  nftIndex: number
}

function ButtonOfCreateWallet({ nftAddress, nftIndex }: IButtonOfCreateWalletProps) {
  const { createNFTWallet, isLoading, isSuccess } = useCreateWallet(nftAddress, nftIndex)

  return (
    <Button
      colorScheme="blue"
      onClick={createNFTWallet}
      isLoading={isLoading}
      isDisabled={isSuccess}
    >
      Create Wallet
    </Button>
  )
}

export default function FindWalletModal({ setNFTWalletAddress }: IFindWalletModalProps) {
  const [nftAddress, setNFTAddress] = useState('')
  const [nftIndex, setNftIndex] = useState(0)

  const [walletAddress, setWalletAddress] = useState(AddressZero)

  const { chain } = useNetwork()
  const safeWallet = isAddress(walletAddress) || AddressZero
  const {
    data: walletIsDeployed = false,
    isLoading,
    refetch,
  } = useNFTWalletIsDeployed({
    walletAddress: safeWallet,
    chainId: chain!.id,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  async function onClick() {
    const chainId = chain?.id
    if (!chainId) return
    if (walletAddress.startsWith('0x') && nftIndex !== 0) {
      const data = await getNFTWalletAddress({
        nftAddress: nftAddress as `0x${string}`,
        index: nftIndex,
        chainId,
      })

      if (data) {
        setWalletAddress(data)
        setNFTWalletAddress(data)
        refetch()
      }
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Find wallet address</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Find Wallet address by nft</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="nft address"
              onChange={(e) => setNFTAddress(e.currentTarget.value)}
            />
            <Input
              placeholder="nft index"
              onChange={(e) => setNftIndex(+e.currentTarget.value)}
            />
            <Button onClick={onClick}>Refresh wallet status</Button>

            {walletAddress !== AddressZero && (
              <>
                <Box>
                  <Text>Wallet Address</Text>
                  <Text>{walletAddress}</Text>
                </Box>
                <Box>
                  {isLoading ? (
                    <Text>Check loading ...</Text>
                  ) : (
                    <Flex flexDir="column" gap="8px">
                      {walletIsDeployed ? (
                        <Badge colorScheme="green">Wallet is deployed</Badge>
                      ) : (
                        <Badge colorScheme="red">Wallet not deployed yet!</Badge>
                      )}
                      {!walletIsDeployed && (
                        <ButtonOfCreateWallet
                          nftAddress={nftAddress}
                          nftIndex={nftIndex}
                        />
                      )}
                    </Flex>
                  )}
                </Box>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}