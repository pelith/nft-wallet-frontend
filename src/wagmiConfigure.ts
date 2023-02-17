import { configureChains, createClient } from 'wagmi'
import { fantom, goerli, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

export const {
  chains,
  provider: web3Provider,
  webSocketProvider,
} = configureChains([mainnet, goerli, fantom], [publicProvider()])

export const wagmiClient = createClient({
  autoConnect: true,
  provider: web3Provider,
  webSocketProvider,
})
wagmiClient.subscribe(console.log.bind(console))
