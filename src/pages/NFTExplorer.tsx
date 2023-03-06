import { Box, Flex } from '@chakra-ui/react'

import NftNavigator from '@/components/nftPicker/NftNavigator'

export default function NFTExplorer() {
  return (
    <Flex
      pt="50px"
      flexDir="column"
      gap="20px"
      justifyContent="center"
      alignItems="center"
    >
      <Box mb="10%" textAlign="center">
        Explorer
      </Box>
      <Flex h="1.5rem" gap="10px" justifyContent="center" alignItems="center">
        <NftNavigator />
      </Flex>
    </Flex>
  )
}
