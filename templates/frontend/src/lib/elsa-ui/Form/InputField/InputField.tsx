import { useFormikContext, useField } from 'formik'
import React from 'react'

import { Input, InputProps } from '../components'

interface Props extends Omit<InputProps, 'onChange' | 'value'> {
  name: string
  allowSubmit?: boolean
}

export const InputField = ({ name, allowSubmit, ...props }: Props) => {
  const [field, meta, helpers] = useField(name)
  const formik = useFormikContext()

  return (
    <Input
      {...props}
      error={meta.error}
      value={field.value}
      onBlur={field.onBlur(name)}
      onChange={(v) => helpers.setValue(v)}
      onFocus={() => helpers.setError('')}
      onSubmit={() => allowSubmit && formik.submitForm()}
    />
  )
}
