import {
  Button,
  Code,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import { useRef, useState } from 'react'
import { useBalance } from 'wagmi'

import { NFT_FACTORY } from '@/constants/nftContract'
import { useDisperseToken } from '@/hooks/useDisperseToken'
import useInputState from '@/hooks/useInputState'
import { useNFTWalletStore } from '@/store'
import { isAddress } from '@/utils/web3Utils'

import { AuthApproveTokenButton } from './AuthButton'

interface IDisperseTokenModalProps {
  NFTWalletAddress?: `0x${string}`
}

const regexKey = /([0-9]*[.])?[0-9]+,([0-9]*[.])?[0-9]+(\r?\n)?/gm

function formatValidate(inputStr: string) {
  if (!regexKey.test(inputStr)) {
    regexKey.lastIndex = 0
    return []
  }
  const inputRaw = inputStr.split(/\n|\n\r/)
  const result = inputRaw.map((e) => {
    const [nftIndex, values] = e.split(',')
    return { nftIndex, values }
  })
  console.log(result)
  return result
}

function DisperseTokenModalContent({ NFTWalletAddress }: IDisperseTokenModalProps) {
  const [tokenAddress, setTokenAddress] = useInputState(
    '0x4da7745993E76929Ba11fDa60cAF671e8161F0fa',
  )
  const [NFTAddress, setNFTAddress] = useInputState(
    '0x1dB5928284301FE16a703543Ac3e1fA6B15E8d93',
  )
  const [inputData, setInputData] = useState<{ nftIndex: string; values: string }[]>([])
  const safeTokenAddress = isAddress(tokenAddress) || AddressZero
  const safeNFTCollectAddress = isAddress(NFTAddress) || AddressZero
  const { isInsufficient, sendTransaction, sum } = useDisperseToken({
    NFTAddress: safeNFTCollectAddress,
    targetInfos: inputData,
    tokenAddress: safeTokenAddress,
    NFTWalletAddress,
  })

  const textAreaInputRef = useRef('')

  const { data } = useBalance({
    address: NFTWalletAddress,
    token: safeTokenAddress,
    cacheTime: 2_000,
    watch: true,
  })

  const formattedBalance = data?.formatted || ''
  const toast = useToast()
  function onClickListValidate() {
    const result = formatValidate(textAreaInputRef.current)
    setInputData(result)
    if (!result.length) {
      toast({
        title: 'Error input format',
        status: 'error',
        position: 'bottom-left',
      })
    }
  }

  const chainId = useNFTWalletStore((state) => state.chainId)

  return (
    <ModalContent>
      <ModalHeader>
        Disperse token
        {NFTWalletAddress && `(with NFTWallet: ${NFTWalletAddress})`}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl>
          <FormLabel>
            Token address {formattedBalance && ` :${formattedBalance}`}
          </FormLabel>
          <Input value={tokenAddress} onInput={setTokenAddress} />
        </FormControl>
        <FormControl>
          <FormLabel>NFT Collect Address</FormLabel>
          <Input value={NFTAddress} onInput={setNFTAddress} />
        </FormControl>
        <FormControl>
          <FormLabel>
            disperse list <Code>{'<NFTIndex>:<values>'}</Code> with new line change
          </FormLabel>
          <Textarea
            onChange={(e) => (textAreaInputRef.current = e.currentTarget.value)}
          />
        </FormControl>
        <VStack mt="9px" align="start">
          <Button onClick={onClickListValidate}>disperse list validate</Button>
          <AuthApproveTokenButton
            NFTWalletAddress={NFTWalletAddress}
            tokenAddress={safeTokenAddress}
            requiredAllowance={sum}
            spender={NFT_FACTORY[chainId] ?? AddressZero}
            isDisabled={isInsufficient || !tokenAddress || !NFTAddress}
            onClick={sendTransaction}
          >
            Confirm
          </AuthApproveTokenButton>
        </VStack>
      </ModalBody>
    </ModalContent>
  )
}

export default function DisperseTokenModal({
  NFTWalletAddress,
}: IDisperseTokenModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const usedString = NFTWalletAddress
    ? 'Open Disperse Transfer with NFTWallet'
    : 'Disperse token with your own wallet'

  return (
    <>
      <Button onClick={onOpen}>{usedString}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <DisperseTokenModalContent NFTWalletAddress={NFTWalletAddress} />
      </Modal>
    </>
  )
}
