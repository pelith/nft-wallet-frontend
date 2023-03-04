import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const NftPickerMainLayout = () => {
  return (
    <Flex direction="column">
      <Box>Title</Box>
      <Box>
        <Outlet />
      </Box>
    </Flex>
  )
}

export default NftPickerMainLayout
