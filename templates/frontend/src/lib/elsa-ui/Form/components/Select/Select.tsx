import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'

import { Input, InputProps } from '../Input'

interface Option {
  label: string
  value: string
}

export interface SelectProps extends Omit<InputProps, 'onChange'> {
  options: Option[]
  onChange: (v: string) => void
}

export const Select = ({ onChange, options, ...props }: SelectProps) => {
  return (
    <Input select onChange={(t, e) => onChange(e.target.value)} {...props}>
      {options.map((option) => (
        <MenuItem key={option.label} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Input>
  )
}
