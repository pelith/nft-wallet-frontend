import { Web3Provider } from '@ethersproject/providers'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { ChainId, DEFAULT_CHAIN_ID } from '@/constants/chain'
export interface IWeb3State {
  account: string
  web3Provider: Web3Provider | null
  provider: any
  connected: boolean
  connecting: boolean
  chainId: ChainId
  blockNumber: number
  isInit: boolean
}

export interface IWeb3Store extends IWeb3State {}
const useWeb3Store = create(
  immer<IWeb3Store>((set) => ({
    account: '',
    web3Provider: null,
    provider: null,
    connected: false,
    connecting: false,
    chainId: DEFAULT_CHAIN_ID,
    blockNumber: 0,
    isInit: false,
    setWeb3provider(provider: Web3Provider) {
      set((state) => (state.web3Provider = provider))
    },
    updateBaseInfo() {},
  })),
)

// do this when load app

export function basicInit() {
  if (!useWeb3Store.getState().web3Provider) {
  }
}
