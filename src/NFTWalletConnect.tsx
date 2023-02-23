import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import { useState } from 'react'
import { useNetwork } from 'wagmi'

import FindWalletModal from './components/FindWallet'
import { NFT_COLLECTION } from './constants/nftColllection'
import useMintNFT from './hooks/useMintNFT'
import NFTWalletControlPanel from './NFTWalletControlPanel'
import { isAddress } from './utils/web3Utils'

export default function NFTWalletConnect() {
  const { chain } = useNetwork()
  const nftSeeds = NFT_COLLECTION[chain!.id] ?? []
  const [selectedNftAddress, setSelectedNFTAddress] = useState(nftSeeds[0])

  const { mintNFT, data, isLoading, isSuccess } = useMintNFT(
    selectedNftAddress || AddressZero,
  )

  const [walletAddress, setWalletAddress] = useState(AddressZero)

  const safeAddress = isAddress(walletAddress) || AddressZero

  const { onCopy, hasCopied } = useClipboard(selectedNftAddress)

  return (
    <Flex flexDir="column" gap="10px">
      <FormControl>
        <FormLabel>Select nft collection</FormLabel>
        <Select onChange={(e) => setSelectedNFTAddress(e.currentTarget.value as any)}>
          {nftSeeds.map((ele) => (
            <option value={ele} key={ele}>
              {ele}
            </option>
          ))}
        </Select>
      </FormControl>
      {!!selectedNftAddress && (
        <Text onClick={onCopy} cursor="pointer">
          selected NFT: {selectedNftAddress}
          {hasCopied && 'copied!'}
        </Text>
      )}
      <Box>
        <Button onClick={mintNFT}>mint nft</Button>
        {isLoading && <Text>Loading</Text>}
        {isSuccess && <Text>{JSON.stringify(data)}</Text>}
      </Box>

      <Box>
        <FindWalletModal setNFTWalletAddress={setWalletAddress} />
        <Input
          value={walletAddress}
          onInput={(e) => setWalletAddress(e.currentTarget.value)}
        ></Input>
      </Box>

      <NFTWalletControlPanel walletAddress={safeAddress} />
    </Flex>
  )
}
