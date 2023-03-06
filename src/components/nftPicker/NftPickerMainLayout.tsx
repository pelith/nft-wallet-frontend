import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Center, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

function back() {
  window.history.back()
}

const NftPickerMainLayout = () => {
  return (
    <Flex direction="column" pt="50px" pos="relative">
      <Center cursor="pointer" pos="absolute" top="0" left="0" onClick={back}>
        <ChevronLeftIcon />
        back
      </Center>
      <Outlet />
    </Flex>
  )
}

export default NftPickerMainLayout
