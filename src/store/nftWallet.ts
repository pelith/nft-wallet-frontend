import { AddressZero } from '@ethersproject/constants'
import { createStore } from '@udecode/zustood'
import { BigNumber } from 'ethers'
import { erc20ABI, erc721ABI } from 'wagmi'
import { multicall, prepareWriteContract, writeContract } from 'wagmi/actions'

import ABINFTWalletFactory from '@/constants/abis/ABINFTWalletFactory'
import { NFT_FACTORY } from '@/constants/nftContract'
import { toast } from '@/utils/createToast'
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
      const key = `${nftAddress}/${orderIndex}`
      try {
        const _orderIndex = BigNumber.from(orderIndex)
        const [walletAddress, ownedBy, imgURI] = await multicall({
          contracts: [
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
            {
              address: nftAddress,
              abi: erc721ABI,
              functionName: 'tokenURI',
              args: [_orderIndex],
            },
          ],
        })

        const isDeployed = await wagmiClient
          .getProvider({ chainId: USED_CHAIN })
          .getCode(walletAddress)
          .then((res) => {
            return res !== '0x'
          })
          .catch(() => false)
        console.log(isDeployed)
        // if (!isDeployed) {
        //   console.log(ABINFTWalletFactory, NFT_FACTORY[USED_CHAIN])
        //   const config = await prepareWriteContract({
        //     abi: ABINFTWalletFactory,
        //     address: NFT_FACTORY[USED_CHAIN],
        //     functionName: 'createWallet',
        //     args: [nftAddress, _orderIndex],
        //   })
        //   await writeContract(config)
        // }

        set.state((draft) => {
          if (!draft.entities.has(key)) {
            draft.wallets.push(key)
          }
          draft.entities.set(key, {
            id: orderIndex,
            nftAddress: nftAddress,
            walletAddress,
            imgURI: imgURI || '',
            ownedBy: ownedBy || AddressZero,
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
        toast({
          title: (error as Error).message,
          status: 'error',
        })
      }
    },
    updateNFTWalletDeployedMessage({
      nftAddress,
      id,
      isDeployed,
    }: {
      nftAddress: `0x${string}`
      id: number
      isDeployed: boolean
    }) {
      const key = `${nftAddress}/${id}`
      set.state((draft) => {
        if (draft.entities.has(key)) {
          draft.entities.get(key)!.isDeployed = isDeployed
        }
      })
    },
    updateNFTStatusPassive({
      ownedBy,
      imgURI = '',
      nftAddress,
      walletAddress = AddressZero,
      isDeployed,
      id,
    }: {
      ownedBy?: `0x${string}`
      imgURI?: string
      nftAddress: `0x${string}`
      isDeployed?: boolean
      walletAddress: `0x${string}`
      id: number
    }) {
      const key = `${nftAddress}/${id}`
      set.state((draft) => {
        if (draft.entities.has(key)) {
          if (ownedBy) draft.entities.get(key)!.ownedBy = ownedBy
          if (imgURI) draft.entities.get(key)!.imgURI = imgURI
          if (typeof isDeployed === 'boolean')
            draft.entities.get(key)!.isDeployed = isDeployed
          if (walletAddress !== AddressZero) {
            draft.entities.get(key)!.walletAddress = walletAddress
          }
        } else {
          draft.entities.set(key, {
            nftAddress,
            id,
            imgURI,
            isDeployed: !!isDeployed,
            ownedBy: ownedBy ?? AddressZero,
            walletAddress,
          })
        }
      })
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
