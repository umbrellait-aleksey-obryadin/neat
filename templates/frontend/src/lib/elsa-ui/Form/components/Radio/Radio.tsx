import { FormControlLabel, Radio as RadioBase, FormControlLabelProps } from '@material-ui/core'
import React from 'react'

export interface RadioProps<T extends string | number>
  extends Omit<FormControlLabelProps, 'value' | 'onChange' | 'control'> {
  value: T
  onChange?: (v: boolean, e: React.ChangeEvent<{}>) => void
}

export const Radio = <T extends string | number>({
  className,
  value,
  onChange,
  ...props
}: RadioProps<T>) => {
  return (
    <div className={className}>
      <FormControlLabel
        {...props}
        control={<RadioBase color="primary" />}
        value={value}
        onChange={(e, checked) => onChange?.(checked, e)}
      />
    </div>
  )
}
