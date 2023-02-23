import { fantom, goerli, localhost } from 'wagmi/chains'

const selfTest = {
  ...localhost,
  id: 8787,
} as const

export const USED_CHAIN_INFO = [goerli, fantom, selfTest]

export enum ChainId {
  FANTOM = fantom.id,
  FORK_MAIN_NET = selfTest.id,
  GOERLI = goerli.id,
}

export const DEFAULT_CHAIN_ID: ChainId =
  import.meta.env.VITE_APP_ENV === 'development' ? ChainId.FORK_MAIN_NET : ChainId.GOERLI

export const JSON_RPC_NETWORK = {
  [ChainId.FANTOM]: import.meta.env.VITE_FANTOM_NETWORK_URL,
  [ChainId.FORK_MAIN_NET]: import.meta.env.VITE_MOCK_NETWORK_URL,
  [ChainId.GOERLI]: import.meta.env.VITE_GOERLI_NETWORK_URL,
}
