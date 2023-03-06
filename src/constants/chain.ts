import { fantom, localhost } from 'wagmi/chains'

const selfTest = {
  ...localhost,
  id: 8787,
  nativeCurrency: fantom.nativeCurrency,
  contract: fantom.contracts,
} as const

export const USED_CHAIN_INFO = [fantom, selfTest]

export enum ChainId {
  FANTOM = fantom.id,
  FORK_MAIN_NET = selfTest.id,
}

export const DEFAULT_CHAIN_ID: ChainId =
  import.meta.env.VITE_APP_ENV === 'development' ? ChainId.FORK_MAIN_NET : ChainId.FANTOM

export const JSON_RPC_NETWORK = {
  [ChainId.FANTOM]: import.meta.env.VITE_FANTOM_NETWORK_URL,
  [ChainId.FORK_MAIN_NET]: import.meta.env.VITE_MOCK_NETWORK_URL,
}

export const USED_CHAIN = +import.meta.env.VITE_APP_CHAIN
