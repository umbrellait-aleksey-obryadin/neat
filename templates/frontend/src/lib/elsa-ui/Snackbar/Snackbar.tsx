import { SnackbarContent, Fade } from '@material-ui/core'
import SnackbarBase, { SnackbarProps } from '@material-ui/core/Snackbar'
import cx from 'classnames'
import React from 'react'

import { Message, NotificationTypes } from '../../notify/types'

import styles from './Snackbar.module.scss'

interface Props extends SnackbarProps {
  state: {
    visible: boolean
    message: Message | null
  }
  close: () => void
}

export const Snackbar = ({ state, close, ...props }: Props): JSX.Element => (
  <SnackbarBase open={state.visible} {...props} TransitionComponent={Fade}>
    <SnackbarContent
      action={<div onClick={close}>X</div>}
      classes={{
        root: cx(
          styles.contentRoot,
          state.message?.type === NotificationTypes.Error && styles.error,
        ),
      }}
      message={state.message?.text}
    />
  </SnackbarBase>
)
