import { Box, Divider, Flex, InputProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface CommonLabelLayoutProps extends Partial<InputProps> {
  label: string
  helperText?: ReactNode
  children?: ReactNode
}

const CommonLabelLayout = ({ label, helperText, children }: CommonLabelLayoutProps) => {
  return (
    <Flex gap="2px" position="relative" h="100%" alignItems="center">
      <Flex flex={1} h="100%">
        <Flex w="250px" direction="column">
          <Box>{label}</Box>
          {helperText && (
            <Box color="#070202" fontSize="small">
              {helperText}
            </Box>
          )}
        </Flex>
        <Divider
          ml="auto"
          mr="20px"
          minH="24px"
          borderColor="emerald.primary"
          orientation="vertical"
        />
      </Flex>
      {children}
    </Flex>
  )
}

export default CommonLabelLayout
