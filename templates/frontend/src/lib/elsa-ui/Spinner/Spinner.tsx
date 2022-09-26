import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress'
import cx from 'classnames'
import React from 'react'

import styles from './Spinner.module.scss'

export enum Sizes {
  large = 44,
  normal = 21,
  small = 18,
}

interface Props extends Omit<CircularProgressProps, 'size'> {
  size?: Sizes
}

export const Spinner = ({ className, size = Sizes.normal, ...props }: Props): JSX.Element => (
  <CircularProgress {...props} className={cx(className, styles.root)} color="inherit" size={size} />
)
