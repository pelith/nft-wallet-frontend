import { configureChains, createClient } from 'wagmi'
import { fantom, goerli, localhost, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const selfTest = {
  ...localhost,
  id: 8787,
}

export const {
  chains,
  provider: web3Provider,
  webSocketProvider,
} = configureChains([mainnet, goerli, fantom, selfTest], [publicProvider()])

export const wagmiClient = createClient({
  autoConnect: true,
  provider: web3Provider,
  webSocketProvider,
})
wagmiClient.subscribe(console.log.bind(console))
