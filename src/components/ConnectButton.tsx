import { Box, Button as CButton, Center, chakra, Divider } from '@chakra-ui/react'
import { useAccount, useBalance, useConnect, useNetwork, useSwitchNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { formatCommonNumber } from '@/utils'
import { shortenAddress } from '@/utils/web3Utils'

const Button = chakra(CButton, {
  baseStyle: {
    borderRadius: '112px',
    px: '70px',
  },
})

const NativeBalance = () => {
  const { address } = useAccount()
  const { data: balance } = useBalance({
    address: address,
  })
  return (
    <Center gap="10px" position="absolute" bottom="-40px" height="1.3rem">
      <Box whiteSpace="nowrap" fontSize="14px">
        Wallet balance
      </Box>
      <Divider borderColor="#1e1e1e" orientation="vertical" />
      <Box whiteSpace="nowrap">
        {formatCommonNumber(balance?.formatted)} {balance?.symbol}
      </Box>
    </Center>
  )
}

export default function ConnectButton() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { isConnected, address } = useAccount()

  const { chain } = useNetwork()

  const { switchNetwork } = useSwitchNetwork()
  return !isConnected ? (
    <Button onClick={() => connect()}>Connect</Button>
  ) : chain?.id !== +import.meta.env.VITE_APP_CHAIN ? (
    <Button onClick={() => switchNetwork?.(+import.meta.env.VITE_APP_CHAIN)}>
      Switch Network
    </Button>
  ) : (
    <Center bg="#B1B1B1" h="40px" px="30px" pos="relative" borderRadius="112px">
      {shortenAddress(address!, 3, 7)}
      <NativeBalance />
    </Center>
  )
}
