import { Web3Provider } from '@ethersproject/providers'

import { ChainId } from '../constants/chain'

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

export interface IPartialWeb3State {
  account?: string
  web3Provider?: Web3Provider | null
  provider?: any
  connected?: boolean
  connecting?: boolean
  chainId?: ChainId
  blockNumber?: number
}

export interface IChainData {
  name: string
  network: string
  network_icon_src?: string
  chain_id: number
  network_id: number
  rpc_url: string
  native_currency: IAssetData
}

export interface IAssetData {
  symbol: string
  name: string
  decimals: string
  contractAddress: string
  balance?: string
}
