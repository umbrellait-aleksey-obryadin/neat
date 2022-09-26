import React, { Children } from 'react'

import { RadioProps } from '../Radio'

import styles from './RadioGroup.module.scss'

export interface RadioGroupProps<T extends string | number> {
  className?: string
  value: T
  onChange: (v?: T) => void
  children: React.ReactElement<RadioProps<T>>[]
  error?: string
  label?: React.ReactNode
}

export const RadioGroup = <T extends string | number>({
  children,
  value,
  error,
  className,
  onChange,
  label,
}: RadioGroupProps<T>) => {
  return (
    <div className={className}>
      {label && <div className={styles.label}>{label}</div>}
      {Children.map(children, (child) =>
        React.cloneElement(child, {
          name: child.props.name,
          checked: value === child.props.value,
          onChange: (v: boolean) => {
            v && onChange(child.props.value)
          },
        }),
      )}
      {Boolean(error) && <div>{error}</div>}
    </div>
  )
}
