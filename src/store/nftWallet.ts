import { AddressZero } from '@ethersproject/constants'
import { createStore } from '@udecode/zustood'
import { BigNumber } from 'ethers'
import { erc20ABI, erc721ABI } from 'wagmi'
import { multicall } from 'wagmi/actions'

import ABINFTWalletFactory from '@/constants/abis/ABINFTWalletFactory'
import { NFT_FACTORY } from '@/constants/nftContract'
import { wagmiClient } from '@/wagmiConfigure'

import { USED_CHAIN } from './../constants/chain'

export const nftWalletsStore = createStore('nftWallets')(
  {
    entities: new Map<
      string,
      {
        walletAddress: `0x${string}`
        id: number
        nftAddress: `0x${string}`
        imgURI: string
        ownedBy: `0x${string}`
        isDeployed: boolean
      }
    >(),
    wallets: [] as string[],
    tokenList: new Map<
      string,
      {
        name: string
        symbol: string
        decimals: number
        address: `0x${string}`
      }
    >([
      [
        '0x4da7745993E76929Ba11fDa60cAF671e8161F0fa',
        {
          name: 'TestToken1',
          symbol: 'TUSDT',
          address: '0x4da7745993E76929Ba11fDa60cAF671e8161F0fa',
          decimals: 18,
        },
      ],
    ]),
  },
  {
    persist: {
      enabled: false,
    },
  },
)
  .extendActions((set) => ({
    async addNFTAddress(nftAddress: `0x${string}`, orderIndex: number) {
      try {
        console.log(orderIndex)
        const _orderIndex = BigNumber.from(orderIndex)
        const [imgURI, walletAddress, ownedBy] = await multicall({
          contracts: [
            {
              address: nftAddress,
              abi: erc721ABI,
              functionName: 'tokenURI',
              args: [_orderIndex],
            },
            {
              address: NFT_FACTORY[USED_CHAIN],
              abi: ABINFTWalletFactory,
              functionName: 'getWalletAddressByNFT',
              args: [nftAddress, _orderIndex],
            },
            {
              address: nftAddress,
              abi: erc721ABI,
              functionName: 'ownerOf',
              args: [_orderIndex],
            },
          ],
        })

        const isDeployed = await wagmiClient
          .getProvider()
          .getCode(walletAddress)
          .then((res) => res !== '0x')

        set.state((draft) => {
          if (!draft.entities.has(`${nftAddress}/${orderIndex}`)) {
            draft.wallets.push(`${nftAddress}/${orderIndex}`)
          }
          draft.entities.set(`${nftAddress}/${orderIndex}`, {
            id: orderIndex,
            nftAddress: nftAddress,
            walletAddress,
            imgURI,
            ownedBy,
            isDeployed,
          })
        })
        console.log({
          id: orderIndex,
          nftAddress: nftAddress,
          walletAddress,
          imgURI,
          ownedBy,
          isDeployed,
        })
      } catch (error) {
        console.error(error)
      }
    },
    async addTokenList(tokenAddress: `0x${string}`) {
      try {
        const [decimals, name, symbol] = await multicall({
          contracts: [
            {
              address: tokenAddress,
              abi: erc20ABI,
              functionName: 'decimals',
            },
            {
              address: tokenAddress,
              abi: erc20ABI,
              functionName: 'name',
            },
            {
              address: tokenAddress,
              abi: erc20ABI,
              functionName: 'symbol',
            },
          ],
        })
        set.state((draft) => {
          draft.tokenList.set(tokenAddress, {
            decimals,
            address: tokenAddress,
            name,
            symbol,
          })
        })
      } catch (error) {
        console.error(error)
      }
    },
  }))
  .extendSelectors((_, get) => ({
    walletInfo(key: string) {
      return (
        get.entities().get(key) ||
        ({
          walletAddress: AddressZero,
          id: 0,
          nftAddress: AddressZero,
          imgURI: '',
          ownedBy: AddressZero,
          isDeployed: false,
        } as const)
      )
    },
  }))
export const useNftWalletsStore = nftWalletsStore.useStore
