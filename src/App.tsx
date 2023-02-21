import './App.css'

import { Button } from '@chakra-ui/react'
import { parseUnits } from 'ethers/lib/utils'
import { useEffect } from 'react'
import {
  useAccount,
  useConnect,
  useContractWrite,
  useEnsName,
  useNetwork,
  usePrepareContractWrite,
  useSigner,
  useSwitchNetwork,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import TestERC20 from '@/constants/abis/testERC20.json'

import { wagmiClient } from './wagmiConfigure'
const testToken = '0xC7b980b118f39F5ffF64d19FaAf137061aa993d3'
wagmiClient.connector?.getSigner({ chainId: 5 })
function App() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { isConnected, address } = useAccount()
  const { data: signer } = useSigner()
  const { data: ensName } = useEnsName({ address })
  const { config, data: contractData } = usePrepareContractWrite({
    address: testToken,
    abi: TestERC20,
    functionName: 'mint',
    args: [address, parseUnits('10')],
    signer,
  })

  const { data, write } = useContractWrite(config)

  useEffect(() => {
    console.log(data)
    console.log(contractData?.request.data)
  }, [data])

  const { chain } = useNetwork()

  const { switchNetwork } = useSwitchNetwork()

  return (
    <>
      {isConnected ? (
        <>
          <button onClick={write}>Test balance</button>
          <div>Connected to {ensName ?? address}</div>
          {chain !== undefined && chain.id !== 8787 ? (
            <Button onClick={() => switchNetwork?.(8787)}>Switch to test</Button>
          ) : chain ? (
            <>
              current on {chain.id} {chain?.name}
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
