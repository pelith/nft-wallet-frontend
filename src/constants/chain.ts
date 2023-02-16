export enum ChainId {
  MAINNET = 1,
  KOVAN = 42,
  POLYGON = 137,
  FANTOM = 250,
  FORK_MAIN_NET = 8787,
  GOERLI = 5,
}

export const DEFAULT_CHAIN_ID: ChainId =
  import.meta.env.VITE_APP_ENV === 'development' ? ChainId.FORK_MAIN_NET : ChainId.GOERLI

export const JSON_RPC_NETWORK = {
  [ChainId.MAINNET]: import.meta.env.VITE_MAINNET_URL,
  [ChainId.POLYGON]: import.meta.env.VITE_POLYGON_NETWORK_URL,
  [ChainId.FANTOM]: import.meta.env.VITE_FANTOM_NETWORK_URL,
  [ChainId.KOVAN]: import.meta.env.VITE_KOVAN_NETWORK_URL,
  [ChainId.FORK_MAIN_NET]: import.meta.env.VITE_MOCK_NETWORK_URL,
  [ChainId.GOERLI]: import.meta.env.VITE_GOERLI_NETWORK_URL,
}
