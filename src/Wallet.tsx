import { Box, Button, Text } from '@chakra-ui/react'

import NFTWallet from '@/constants/abis/NFTWallet.json'

const testToken = {}

export default function Wallet() {
  return (
    <Box>
      <Button>Approve</Button>

      <Text>Token balance</Text>
      <Text></Text>
    </Box>
  )
}
