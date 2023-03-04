import { Box, Divider, Flex, Input, InputProps } from '@chakra-ui/react'
import React from 'react'

interface CommonInputProps extends Partial<InputProps> {
  label: string
  helperText?: string
}

const CommonInput = ({ label, helperText, value, onChange }: CommonInputProps) => {
  return (
    <Flex gap="2" position="relative" h="100%">
      <Flex flex={1}>
        <Flex direction="column">
          <Box>{label}</Box>
          {helperText && <Box>{helperText}</Box>}
        </Flex>
        <Divider ml="auto" orientation="vertical" />
      </Flex>
      <Input flex={5} value={value} onChange={onChange} />
    </Flex>
  )
}

export default CommonInput
