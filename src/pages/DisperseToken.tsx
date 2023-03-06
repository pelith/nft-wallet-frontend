import { Box, Button, Divider, Flex, Input, Text, Textarea } from '@chakra-ui/react'
import { AddressZero } from '@ethersproject/constants'
import range from 'lodash/range'
import { useMemo, useState } from 'react'

import { AuthApproveTokenButton } from '@/components/AuthButton'
import { USED_CHAIN } from '@/constants/chain'
import { NFT_COLLECTION } from '@/constants/nftCollection'
import { NFT_FACTORY } from '@/constants/nftContract'
import { useDisperseToken } from '@/hooks/useDisperseToken'
import { nftWalletsStore } from '@/store/nftWallet'
import { isAddress } from '@/utils/web3Utils'

function disperseFormValidate(inputStr: string) {
  const lines = inputStr.split('\n')
  return lines
    .map((line) => {
      const [idRange, values] = line.split(',')
      console.log(values)
      if (!/(^\d+-\d+|\d+)$/.test(idRange)) {
        return false
      }
      if (isNaN(parseFloat(values))) {
        return false
      }

      if (~idRange.indexOf('-')) {
        const [startId, endId] = idRange.split('-').map(Number)
        if (startId > endId) return false
        return range(startId, endId).map((id) => ({
          nftIndex: '' + id,
          value: values,
        }))
      }
      return [{ nftIndex: idRange, values: values }]
    })
    .flat()
}

export default function DisperseToken() {
  const [nftAddress, setNFTAddress] = useState('')
  const [asset, setAsset] = useState('')
  const [disperseList, setDisperseList] = useState('')
  const validDisperseInput = useMemo(() => {
    try {
      const result = disperseFormValidate(disperseList)
      console.log(result)
      if (result.some((e) => !e)) return false
      return result as { nftIndex: string; values: string }[]
    } catch (e) {
      console.error(e)
      return false
    }
  }, [disperseList])

  const safeAssetAddress = isAddress(asset) || AddressZero
  const safeNFTAddress = isAddress(nftAddress) || AddressZero

  const { isInsufficient, isLoading, sendTransaction, sum, balanceData } =
    useDisperseToken({
      tokenAddress: safeAssetAddress,
      targetInfos: validDisperseInput || [],
      NFTAddress: safeNFTAddress,
    })

  return (
    <Flex pt="50px" flexDir="column" gap="30px" justifyContent="center">
      <Box mb="15px" textAlign="center">
        Disperse Token
      </Box>

      <Flex h="1.5rem" gap="10px" justifyContent="start" alignItems="center">
        <Text w="150px">NFT address</Text>
        <Divider orientation="vertical" borderColor="blackAlpha.700" />
        <Input
          bg="#D9D9D9"
          placeholder="0x..."
          title="NFT Address"
          w="30vw"
          size="sm"
          autoComplete="off"
          rounded="1rem"
          autoCorrect="off"
          value={nftAddress}
          onChange={(e) => setNFTAddress(e.currentTarget.value)}
        />
        {NFT_COLLECTION[USED_CHAIN].map((nft) => (
          <Button
            key={nft.address}
            size="sm"
            onClick={() => {
              setNFTAddress(nft.address)
            }}
          >
            {nft.name}
          </Button>
        ))}
      </Flex>
      <Flex h="1.5rem" gap="10px" justifyContent="start" alignItems="center">
        <Text w="150px">
          Asset: <br />
          {balanceData?.symbol} {balanceData?.formatted}
        </Text>
        <Divider orientation="vertical" borderColor="blackAlpha.700" />
        <Input
          bg="#D9D9D9"
          placeholder="0x..."
          title="Asset"
          w="30vw"
          size="sm"
          value={asset}
          autoComplete="off"
          rounded="1rem"
          autoCorrect="off"
          onChange={(e) => setAsset(e.currentTarget.value)}
        />
        {[...nftWalletsStore.get.tokenList()].map((token) => (
          <Button
            size="sm"
            key={token[0]}
            onClick={() => {
              setAsset(token[0])
              console.log(token[0])
            }}
          >
            {token[1].name}
          </Button>
        ))}
      </Flex>
      <Flex minH="1.5rem" gap="10px" justifyContent="start" alignItems="start">
        <Text w="150px">Index & Amount</Text>
        <Divider h="1.5rem" orientation="vertical" borderColor="blackAlpha.700" />
        <Textarea
          bg="#D9D9D9"
          placeholder="Format: Index, Amount"
          title="NFT Wallet Address"
          w="30vw"
          size="sm"
          rows={5}
          autoComplete="off"
          rounded="1rem"
          autoCorrect="off"
          onChange={(e) => setDisperseList(e.currentTarget.value)}
        />
        <Box as="pre">{`Format: Index,Amount\nExample: 1-50,100\n         60-100,200`}</Box>
      </Flex>
      <Flex>
        <AuthApproveTokenButton
          tokenAddress={safeAssetAddress}
          requiredAllowance={sum}
          spender={NFT_FACTORY[USED_CHAIN]}
          isDisabled={
            isInsufficient ||
            safeAssetAddress === AddressZero ||
            safeNFTAddress === AddressZero ||
            !validDisperseInput
          }
          isLoading={isLoading}
          onClick={sendTransaction}
        >
          Confirm
        </AuthApproveTokenButton>
      </Flex>
    </Flex>
  )
}
