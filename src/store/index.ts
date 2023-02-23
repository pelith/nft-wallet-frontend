import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { ChainId } from '@/constants/chain'
export interface INFTWalletStore {
  chainId: ChainId
  nftWalletAddress: string
  isOwnerOfNFTWallet: boolean
  importedTokenList: Record<ChainId, string[]>
}

export interface IWeb3Store extends INFTWalletStore {
  setChainId(chainId: ChainId): void
  setNFTWalletAddress(address: string): void
  setIsOwnerOfNFTWallet(walletAddress: string, isOwner: boolean): void
  importTokenList(list: string[]): void
}
export const useNFTWalletStore = create(
  immer<IWeb3Store>((set) => ({
    nftWalletAddress: '',
    isOwnerOfNFTWallet: false,
    importedTokenList: {},
    chainId: ChainId.FORK_MAIN_NET,
    setChainId(chainId) {
      set((state) => (state.chainId = chainId))
    },
    setNFTWalletAddress(address) {
      set((state) => (state.nftWalletAddress = address))
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
        const _set = new Set([...(state.importedTokenList[state.chainId] ?? []), ...list])
        ;(state.importedTokenList[state.chainId] ??= []).push(
          ...[..._set].slice(state.importedTokenList[state.chainId].length),
        )
      })
    },
  })),
)
