import { AddressZero } from '@ethersproject/constants'
import { createStore } from '@udecode/zustood'
import { erc20ABI } from 'wagmi'
import { multicall } from 'wagmi/actions'

import { tokenList } from '@/constants/token'
import { NFTWalletInfo } from '@/types/walletInfo'
import { toast } from '@/utils/createToast'
import readNFTWalletInfo from '@/utils/readNFTWalletInfo'
console.log(import.meta.env.DEV)
export const nftWalletsStore = createStore('nftWallets')(
  {
    entities: new Map<string, NFTWalletInfo>(),
    wallets: [] as string[],
    tokenList: new Map<
      string,
      {
        name: string
        symbol: string
        decimals: number
        address: `0x${string}`
      }
    >(
      import.meta.env.DEV
        ? [
            [
              '0x4da7745993E76929Ba11fDa60cAF671e8161F0fa',
              {
                name: 'TestToken1',
                symbol: 'TUSDT',
                address: '0x4da7745993E76929Ba11fDa60cAF671e8161F0fa',
                decimals: 18,
              },
            ],
          ]
        : tokenList.map((ele) => [ele.address, ele]),
    ),
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
        const walletInfo = await readNFTWalletInfo(nftAddress, orderIndex)
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
          draft.entities.set(key, walletInfo)
        })

        console.log(walletInfo)
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
