import { configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import { USED_CHAIN_INFO } from './constants/chain'
import { useNFTWalletStore } from './store'

export const {
  chains,
  provider: web3Provider,
  webSocketProvider,
} = configureChains(USED_CHAIN_INFO, [publicProvider()])

export const wagmiClient = createClient({
  autoConnect: true,
  provider: web3Provider,
  webSocketProvider,
})
wagmiClient.subscribe(console.log.bind(console))

wagmiClient.subscribe((state) => {
  if (state.data?.chain?.id) {
    useNFTWalletStore.setState({ chainId: state.data.chain.id })
  }
})
