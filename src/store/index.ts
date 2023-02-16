import { create } from 'zustand'
import { Web3Provider } from '@ethersproject/providers'
export interface IWeb3State extends IPartialWeb3State {
  account: string
  web3Provider: Web3Provider | null
  provider: any
  connected: boolean
  connecting: boolean
  chainId: ChainId
  blockNumber: number
  isInit: boolean
}
const useWeb3State = create((set) => ({
  account: '',
  chainId: 1,
  connected: false,
  isInit: false,
  web3Provider: null
}))
