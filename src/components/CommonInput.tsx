import { Box, Divider, Flex, Input, InputProps, Select } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface CommonInputProps extends Partial<InputProps> {
  label: string
  helperText?: ReactNode
  options?: { label: string; value: string }[]
}

const CommonInput = ({
  label,
  helperText,
  value,
  onChange,
  options,
}: CommonInputProps) => {
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
        <Divider ml="auto" mr="20px" borderColor="#79ffb5" orientation="vertical" />
      </Flex>
      {options ? (
        <Select onChange={(e) => onChange?.(e as any)}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          autoComplete="off"
          autoCorrect="off"
          flex={5}
          value={value}
          w="30vw"
          size="sm"
          rounded="1rem"
          onChange={onChange}
        />
      )}
    </Flex>
  )
}

export default CommonInput
