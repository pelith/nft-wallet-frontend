import { Box, Button, Select, Text } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import { useState } from 'react'
import { useNetwork } from 'wagmi'

import { NFT_COLLECTION } from './constants/nftColllection'
import useMintNFT from './hooks/useMintNFT'

export default function Wallet() {
  const { chain } = useNetwork()
  const nftSeeds = NFT_COLLECTION[chain!.id] ?? []
  console.log(nftSeeds, chain!.id, NFT_COLLECTION)
  const [selectedNftAddress, setSelectedNFTAddress] = useState(nftSeeds[0])

  const { mintNFT, data, isLoading, isSuccess } = useMintNFT(
    selectedNftAddress || AddressZero,
  )

  return (
    <Box>
      <Button>Approve</Button>
      <Select onChange={(e) => setSelectedNFTAddress(e.currentTarget.value as any)}>
        {nftSeeds.map((ele) => (
          <option value={ele} key={ele}>
            {ele}
          </option>
        ))}
      </Select>
      <Box>
        <Button onClick={mintNFT}>mint nft</Button>
        <Text>mint nft</Text>
        {isLoading && <Text>Loading</Text>}
        {isSuccess && <Text>{JSON.stringify(data)}</Text>}
      </Box>
    </Box>
  )
}
