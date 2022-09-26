import { TextField, TextFieldProps } from '@material-ui/core'
import React, { useState } from 'react'

import { cx } from '~/styles'

import styles from './Input.module.scss'

export interface InputProps extends Omit<TextFieldProps, 'onChange' | 'error' | 'value'> {
  error?: string | boolean
  value: string
  onChange: (text: string, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  className?: string
}

export const Input = ({
  error,
  onChange,
  className,
  fullWidth = true,
  onSubmit,
  variant = 'standard',
  ...props
}: InputProps) => {
  const [focused, setFocused] = useState<boolean>(false)

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onSubmit?.(e)
    }
  }

  return (
    <div className={cx(className, styles.root)}>
      <TextField
        {...props}
        error={Boolean(error)}
        focused={Boolean(props.value) || focused}
        fullWidth={fullWidth}
        helperText={undefined}
        value={props.value || ''}
        variant={variant}
        onBlur={(e) => [setFocused(false), props.onBlur?.(e)]}
        onChange={(e) => onChange(e.currentTarget.value, e)}
        onFocus={(e) => [setFocused(true), props.onFocus?.(e)]}
        onKeyDown={onKeyDown}
      />
      {Boolean(error) && <div className={cx(styles.errorText)}>{error}</div>}
    </div>
  )
}
