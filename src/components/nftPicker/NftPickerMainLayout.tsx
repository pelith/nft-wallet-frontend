import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Box, Center, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

function back() {
  window.history.back()
}

const NftPickerMainLayout = () => {
  return (
    <Flex direction="column" pt="50px" pos="relative" h="100%">
      <Center cursor="pointer" pos="absolute" top="0" left="0" onClick={back} mt="16px">
        <ChevronLeftIcon />
        Back
      </Center>
      <Box w="100%" flex="1">
        <Outlet />
      </Box>
    </Flex>
  )
}

export default NftPickerMainLayout
