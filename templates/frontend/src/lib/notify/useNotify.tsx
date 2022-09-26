import { useContext } from 'react'

import { NotificationsContext } from './NotificationsContext'

export const useNotify = () => {
  const value = useContext(NotificationsContext)

  if (!value) {
    throw new Error('useNotify can only be used inside a NotificationsProvider')
  }

  return value
}

export type Notify = ReturnType<typeof useNotify>
