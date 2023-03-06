import { Input, InputProps, Select } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import CommonLabelLayout from './CommonLabelLayout'

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
  placeholder,
}: CommonInputProps) => {
  return (
    <CommonLabelLayout label={label} helperText={helperText}>
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
          _placeholder={{ color: 'emerald.tertiary' }}
          autoComplete="off"
          autoCorrect="off"
          flex={5}
          value={value}
          w="30vw"
          size="sm"
          rounded="1rem"
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </CommonLabelLayout>
  )
}

export default CommonInput
