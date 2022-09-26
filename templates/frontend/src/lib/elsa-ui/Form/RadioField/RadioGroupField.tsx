import { useField } from 'formik'
import React from 'react'

import { RadioGroup, RadioGroupProps } from '../components'

interface Props extends Omit<RadioGroupProps<string | number>, 'onChange' | 'value'> {
  name: string
  label?: React.ReactNode
}

export const RadioGroupField = ({ name, ...props }: Props) => {
  const [field, meta, helpers] = useField(name)

  return (
    <RadioGroup
      {...props}
      error={meta.error}
      value={field.value}
      onChange={(v) => {
        helpers.setValue(v)
        helpers.setError('')
      }}
    />
  )
}
