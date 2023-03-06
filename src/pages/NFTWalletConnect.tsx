import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAccount, useNetwork } from 'wagmi'

import NFTPreviewLoader from '@/components/NFTPreviewLoader'
import { USED_CHAIN } from '@/constants/chain'
import { NFT_COLLECTION, SAMPLE_NFT_ADDRESS } from '@/constants/nftCollection'
import { useNftWalletsStore } from '@/store/nftWallet'
import getERC721EnumerableScan from '@/utils/getERC721EnumerableScan'
import { isAddress } from '@/utils/web3Utils'

export default function NFTWalletConnect() {
  const [usedCollection, setUsedCollection] = useState('all')
  const { chain } = useNetwork()
  const { hash } = useLocation()

  const nftCollectionOptions = useMemo(() => {
    return NFT_COLLECTION[USED_CHAIN]
  }, [chain?.id])

  const selected = useMemo(() => {
    if (usedCollection === 'all') return 'All'
    return NFT_COLLECTION[USED_CHAIN].find((e) => e.address === usedCollection)!.name
  }, [usedCollection])

  const canScan = useMemo(() => {
    if (!nftCollectionOptions.length) return false
    if (usedCollection === 'all') return false
    return !nftCollectionOptions.find((e) => e.address === usedCollection)?.notEnumerable
  }, [nftCollectionOptions, usedCollection])

  const { address } = useAccount()

  const isConnected = address && chain?.id

  const selfWallets = useNftWalletsStore((state) => state.wallets)

  const displayWallets = useMemo(() => {
    if (usedCollection === 'all') {
      return selfWallets
    } else {
      return selfWallets.filter((walletKey) => walletKey.startsWith(usedCollection))
    }
  }, [selfWallets, usedCollection])

  function scan(collectionAddress: string) {
    if (isAddress(address)) {
      getERC721EnumerableScan(
        address as `0x${string}`,
        collectionAddress as `0x${string}`,
      )
    }
  }

  useEffect(() => {
    if (hash === '#scan-sample') {
      scan(SAMPLE_NFT_ADDRESS[USED_CHAIN])
    }
  }, [hash])

  return (
    <Box mt="30px">
      <Flex gap="10px">
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} borderBottomRadius="0">
            Collections: {selected}
          </MenuButton>
          <MenuList bg="grey">
            <MenuOptionGroup
              onChange={(e) => setUsedCollection(e as string)}
              defaultValue="all"
              value={usedCollection}
            >
              <MenuItemOption value="all" bg="grey">
                All
              </MenuItemOption>
              {nftCollectionOptions.map((ele) => (
                <MenuItemOption bg="grey" key={ele.address} value={ele.address}>
                  {ele.name}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        {canScan && (
          <Button size="md" onClick={() => scan(usedCollection)} borderBottomRadius="0">
            Scan
          </Button>
        )}
      </Flex>
      <Box bg="#3e3959" w="100%" p="20px 15px" minH="60vh" h="1px">
        {isConnected ? (
          <Flex flexWrap="wrap" columnGap="10px" rowGap="15px" h="auto">
            {displayWallets.map((walletAddress) => (
              <NFTPreviewLoader nftWalletKey={walletAddress} key={walletAddress} />
            ))}
            <NavLink to="/nft-picker">
              <Box p="10px" display="inline-block" textAlign="center" role="group">
                <Center
                  bg="#F3F3F3"
                  w="150px"
                  h="150px"
                  cursor="pointer"
                  _groupHover={{
                    bg: '#e7e7e7',
                  }}
                >
                  <AddIcon w="25%" h="25%" />
                </Center>
                <strong>Create Wallet</strong>
              </Box>
            </NavLink>
          </Flex>
        ) : (
          <Flex
            flexWrap="wrap"
            bg="#676767"
            columnGap="10px"
            rowGap="15px"
            h="100%"
          ></Flex>
        )}
      </Box>
    </Box>
  )
}
