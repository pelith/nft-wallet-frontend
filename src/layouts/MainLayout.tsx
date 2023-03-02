import { Box, Center, Flex } from '@chakra-ui/react'
import cond from 'lodash/cond'
import constant from 'lodash/constant'
import matches from 'lodash/matches'
import stubTrue from 'lodash/stubTrue'
import { CSSProperties } from 'react'
import { NavLink } from 'react-router-dom'
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
    <Box padding="182px 180px 0px">
      <Flex w="full">
        <Center
          display="flex"
          as={NavLink}
          w="442px"
          h="113px"
          to="/profile"
          style={getActiveStyle}
        >
          Profile
        </Center>
        <Center
          display="flex"
          as={NavLink}
          w="442px"
          h="113px"
          style={getActiveStyle}
          to="/disperse"
        >
          Disperse
        </Center>
        <Center
          display="flex"
          as={NavLink}
          w="442px"
          h="113px"
          style={getActiveStyle}
          to="/explore"
        >
          Profile
        </Center>
      </Flex>
    </Box>
  )
}
