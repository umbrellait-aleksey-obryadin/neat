import React, { useState, useMemo, useRef, useCallback } from 'react'

import { NotificationsContext } from './NotificationsContext'
import { Message, NotificationTypes } from './types'

interface ChildRenderProps {
  state: State
  close: () => void
}

interface State {
  visible: boolean
  message: Message | null
}

interface Props {
  children: React.ReactNode
  renderItem: (props: ChildRenderProps) => React.ReactNode
  logger: (...args: unknown[]) => void
  autohide?: { timeOpen: number; timeOut: number } | null
}

const SNACKBAR_TIME_OPEN = 3000
const SNACKBAR_ANIMATION_OUT_TIMING = 800

const wait = async (ms: number) => new Promise((r) => setTimeout(r, ms))

export const NotificationsProvider = ({
  children,
  renderItem,
  logger,
  autohide = { timeOpen: SNACKBAR_TIME_OPEN, timeOut: SNACKBAR_ANIMATION_OUT_TIMING },
}: Props) => {
  const [state, setState] = useState<State>({
    visible: false,
    message: null,
  })
  const promiseRef = useRef<Promise<unknown>>(Promise.resolve())

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }))
  }, [])

  const show = useCallback(
    async (type: NotificationTypes | string, text: string) => {
      promiseRef.current = promiseRef.current.then(async () => {
        setState({ visible: true, message: { type, text } })
        if (autohide) {
          await wait(autohide.timeOpen)
          close()
          await wait(autohide.timeOut)
        }
      })
    },
    [close, autohide],
  )

  const showError = useCallback(
    (err: unknown, defaultMessage?: string, logError?: boolean) => {
      logError && logger(err)
      const errorMessage =
        defaultMessage ?? (err as Error).message ?? 'An unexpected error occurred'
      void show(NotificationTypes.Error, errorMessage)
    },
    [logger, show],
  )

  const logAndError = useCallback(
    (err: unknown, defaultMessage?: string) => showError(err, defaultMessage, true),
    [showError],
  )

  const error = useCallback(
    (err: unknown, defaultMessage?: string) => showError(err, defaultMessage),
    [showError],
  )

  const success = useCallback(
    (text: string) => {
      void show(NotificationTypes.Success, text)
    },
    [show],
  )

  const notificationValues = useMemo(() => ({ error, success, logAndError, show }), [
    error,
    success,
    logAndError,
    show,
  ])

  return (
    <NotificationsContext.Provider value={notificationValues}>
      {renderItem({ state, close })}
      {children}
    </NotificationsContext.Provider>
  )
}
