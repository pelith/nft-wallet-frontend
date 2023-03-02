import { Box, Center, Flex } from '@chakra-ui/react'
import cond from 'lodash/cond'
import constant from 'lodash/constant'
import matches from 'lodash/matches'
import stubTrue from 'lodash/stubTrue'
import { CSSProperties } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import ConnectButton from '@/components/ConnectButton'
const activeStyle = {
  background: '#808080',
  color: 'white',
}

const getActiveStyle = cond<{ isActive: boolean }, CSSProperties>([
  [matches({ isActive: true }), constant(activeStyle)],
  [stubTrue, constant({})],
])

export default function MainLayout() {
  return (
    <Box padding="60px 120px 0px">
      <Flex
        w="full"
        position="relative"
        borderRadius="20px 70px 70px 20px"
        bg="#D9D9D9"
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
          bg="#B3B3B3"
          _hover={{ background: '#999999', color: 'white' }}
        >
          Profile
        </Center>
        <Center
          display="flex"
          as={NavLink}
          w="180px"
          h="2.5rem"
          style={getActiveStyle}
          _hover={{ background: '#999999', color: 'white' }}
          bg="#B3B3B3"
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
          _hover={{ background: '#999999', color: 'white' }}
          bg="#B3B3B3"
          to="/explorer"
        >
          Explorer
        </Center>
        <ConnectButton />
      </Flex>
      <Outlet />
    </Box>
  )
}
