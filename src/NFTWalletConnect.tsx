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
  useToast,
} from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import { useEffect, useMemo, useState } from 'react'
import { useAccount, useContractEvent, useContractRead, useNetwork } from 'wagmi'

import DisperseTokenModal from './components/DisperseToken'
import FindWalletModal from './components/FindWallet'
import ABINFTRarity from './constants/abis/ABINFTRarity'
import { NFT_COLLECTION, NFTCollectionInfo } from './constants/nftColllection'
import useMintNFT from './hooks/useMintNFT'
import NFTWalletControlPanel from './NFTWalletControlPanel'
import { useNFTWalletStore } from './store'
import mintRarity from './utils/mintRarity'
import { isAddress } from './utils/web3Utils'

export default function NFTWalletConnect() {
  const { chain } = useNetwork()
  const nftSeeds = NFT_COLLECTION[chain!.id] ?? []
  const [selectedNftAddress, setSelectedNFTAddress] = useState(nftSeeds[0].address)

  const { mintNFT, data, isLoading, isSuccess } = useMintNFT(
    selectedNftAddress || AddressZero,
  )

  const selectedNFTInfo = useMemo(() => {
    return nftSeeds.find((nft) => nft.address === selectedNftAddress)!
  }, [selectedNftAddress])

  const [walletAddress, setWalletAddress] = useState(AddressZero)

  const setNFTWalletAddress = useNFTWalletStore((state) => state.setNFTWalletAddress)
  const nftWalletAddress = useNFTWalletStore((state) => state.nftWalletAddress)

  const safeAddress = isAddress(walletAddress) || AddressZero

  const { onCopy, hasCopied } = useClipboard(selectedNftAddress)

  useEffect(() => {
    if (safeAddress !== AddressZero) {
      setNFTWalletAddress(safeAddress)
    }
  }, [safeAddress])

  useContractEvent({
    abi: ABINFTRarity,
    address: NFTCollectionInfo.rarity.address,
    eventName: 'summoned',
    listener() {
      console.log(arguments)
    },
  })

  const { address } = useAccount()
  const toast = useToast()

  const { data: rarityNextSummoned } = useContractRead({
    abi: ABINFTRarity,
    address: NFTCollectionInfo.rarity.address,
    functionName: 'next_summoner',
    enabled: selectedNftAddress === NFTCollectionInfo.rarity.address,
    watch: true,
    staleTime: 2_000,
  })

  async function mintRarityNFT() {
    const { summonedIndex } = await mintRarity(address!)
    toast({
      title: `summon ${summonedIndex}`,
      status: 'success',
    })
  }

  return (
    <Flex flexDir="column" gap="10px">
      <FormControl>
        <FormLabel>Select nft collection</FormLabel>
        <Select onChange={(e) => setSelectedNFTAddress(e.currentTarget.value as any)}>
          {nftSeeds.map((ele) => (
            <option value={ele.address} key={ele.address}>
              {ele.address}
            </option>
          ))}
        </Select>
      </FormControl>
      {!!selectedNftAddress && (
        <Text onClick={onCopy} cursor="pointer">
          selected NFT: {selectedNFTInfo.name} {selectedNFTInfo.address}
          {hasCopied && 'copied!'}
        </Text>
      )}
      <Box>
        <Button onClick={mintNFT}>mint nft</Button>
        <Button onClick={mintRarityNFT}>
          mint rarity nft: {rarityNextSummoned?.toNumber()}
        </Button>
        {isLoading && <Text>Loading</Text>}
        {isSuccess && <Text>{JSON.stringify(data)}</Text>}
      </Box>

      <Box>
        <FindWalletModal setNFTWalletAddress={setNFTWalletAddress} />
        <Input
          value={nftWalletAddress}
          onInput={(e) => setWalletAddress(e.currentTarget.value)}
        ></Input>
      </Box>

      <Box>
        <DisperseTokenModal />
      </Box>

      <NFTWalletControlPanel NFTWalletAddress={nftWalletAddress} />
    </Flex>
  )
}
