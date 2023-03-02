import { AddressZero } from '@ethersproject/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { ChainId } from '@/constants/chain'
import { isAddress } from '@/utils/web3Utils'
export interface INFTWalletStore {
  chainId: ChainId
  nftWalletAddress: `0x${string}`
  isOwnerOfNFTWallet: boolean
  importedTokenList: Record<ChainId, string[]>

  nftAddress: `0x${string}`
  nftIndex: number
}
export interface IWeb3Store extends INFTWalletStore {
  setChainId(chainId: ChainId): void
  setNFTWalletAddress(address: string): void
  setNFTSelected(address: string, nftIndex: number): void
  setIsOwnerOfNFTWallet(walletAddress: string, isOwner: boolean): void
  importTokenList(list: string[]): void
}
export const useNFTWalletStore = create(
  persist(
    immer<IWeb3Store>((set) => ({
      nftAddress: AddressZero,
      nftIndex: 0,
      nftWalletAddress: AddressZero,
      isOwnerOfNFTWallet: false,
      importedTokenList: {},
      chainId: ChainId.FORK_MAIN_NET,
      setChainId(chainId) {
        set((state) => void (state.chainId = chainId))
      },
      setNFTSelected(address, nftIndex) {
        set((state) => {
          if (isAddress(address)) {
            state.nftAddress = address as `0x${string}`
            state.nftIndex = nftIndex
          }
        })
      },
      setNFTWalletAddress(address) {
        set((state) => {
          const _address = isAddress(address)
          if (_address) {
            state.nftWalletAddress = _address
          }
        })
      },
      setIsOwnerOfNFTWallet(walletAddress, isOwner) {
        set((state) => {
          if (state.nftWalletAddress === walletAddress) {
            state.isOwnerOfNFTWallet = isOwner
          }
        })
      },
      importTokenList(list) {
        set((state) => {
          const _set = new Set([
            ...(state.importedTokenList[state.chainId] ?? []),
            ...list,
          ])
          ;(state.importedTokenList[state.chainId] ??= []).push(
            ...[..._set].slice(state.importedTokenList[state.chainId].length),
          )
        })
      },
    })),
    {
      name: 'nftWallet',
      version: 0,
      partialize(state) {
        return {
          importedTokenList: state.importedTokenList,
        }
      },
    },
  ),
)
