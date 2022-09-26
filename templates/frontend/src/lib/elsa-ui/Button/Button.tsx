import cx from 'classnames'
import React from 'react'

import { Spinner } from '../Spinner'

import styles from './Button.module.scss'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled'
  variantColor?: 'primary'
  loading?: boolean
  className?: string
  onClick: () => void
}

export const Button = ({
  variant = 'filled',
  loading,
  className,
  children,
  type = 'button',
  variantColor = 'primary',
  onClick,
  ...props
}: ButtonProps): JSX.Element => {
  const variantButton = styles[variant]
  const bgColor = variantColor && styles[variantColor]

  return (
    <button
      className={cx(styles.root, loading && styles.loading, variantButton, className, bgColor)}
      type={type}
      onClick={onClick}
      {...props}
    >
      <div className={styles.text}>{children}</div>
      {loading && <Spinner className={styles.spinner} />}
    </button>
  )
}
