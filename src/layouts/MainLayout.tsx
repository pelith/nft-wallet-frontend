import { Box, Center, Flex } from '@chakra-ui/react'
import cond from 'lodash/cond'
import constant from 'lodash/constant'
import matches from 'lodash/matches'
import stubTrue from 'lodash/stubTrue'
import { CSSProperties } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import ConnectButton from '@/components/ConnectButton'
const activeStyle = {
  background: '#645d8d',
  color: 'white',
}

const getActiveStyle = cond<{ isActive: boolean }, CSSProperties>([
  [matches({ isActive: true }), constant(activeStyle)],
  [stubTrue, constant({})],
])

export default function MainLayout() {
  return (
    <Flex direction="column" padding="60px 120px 0px" h="100%">
      <Flex
        w="full"
        position="relative"
        borderRadius="20px 70px 70px 20px"
        bg="#3e3959"
        alignItems="center"
      >
        <Center
          borderRadius="8px 0 0 8px"
          display="flex"
          as={NavLink}
          w="180px"
          h="2.5rem"
          to="/"
          style={getActiveStyle}
          bg="#7b7697"
          _hover={{ background: '#776bb9', color: 'white' }}
        >
          Profile
        </Center>
        <Center
          display="flex"
          as={NavLink}
          w="180px"
          h="2.5rem"
          style={getActiveStyle}
          _hover={{ background: '#776bb9', color: 'white' }}
          bg="#7b7697"
          to="/disperse"
        >
          Disperse
        </Center>
        <Center
          mr="auto"
          display="flex"
          as={NavLink}
          w="180px"
          h="2.5rem"
          style={getActiveStyle}
          _hover={{ background: '#776bb9', color: 'white' }}
          bg="#7b7697"
          to="/explorer"
        >
          Explorer
        </Center>
        <ConnectButton />
      </Flex>
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  )
}
