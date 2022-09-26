import { useField } from 'formik'
import React from 'react'

import { SelectProps, Select } from '../components'

interface Props extends Omit<SelectProps, 'onChange' | 'value'> {
  name: string
}

export const SelectField = ({ name, options, ...props }: Props) => {
  const [field, meta, helpers] = useField(name)

  return (
    <Select
      {...props}
      error={meta.error}
      options={options}
      value={field.value}
      onBlur={field.onBlur(name)}
      onChange={(v) => helpers.setValue(v)}
      onFocus={() => helpers.setError('')}
    />
  )
}
