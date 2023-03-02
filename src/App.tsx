import { Button } from '@chakra-ui/react'
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import NFTWalletConnect from './NFTWalletConnect'
import { wagmiClient } from './wagmiConfigure'
wagmiClient.connector?.getSigner({ chainId: 5 })
function App() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { isConnected, address } = useAccount()

  const { chain } = useNetwork()

  const { switchNetwork } = useSwitchNetwork()

  return (
    <>
      {isConnected ? (
        <>
          <div>Connected to {address}</div>
          {chain !== undefined && chain.id !== 8787 ? (
            <Button onClick={() => switchNetwork?.(8787)}>Switch to test</Button>
          ) : chain ? (
            <>
              current on {chain.id} {chain?.name}
              <NFTWalletConnect />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <button onClick={() => connect()}>connect</button>
      )}
    </>
  )
}

export default App
