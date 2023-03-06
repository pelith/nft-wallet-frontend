import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const BannerHeading = ({ children }: Props) => {
  return (
    <Box w="100%" fontSize="30px" textAlign={'center'} bg="neutral.700">
      {children}
    </Box>
  )
}

export default BannerHeading
