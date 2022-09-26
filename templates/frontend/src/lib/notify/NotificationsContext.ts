import { createContext } from 'react'

import { NotificationTypes } from './types'

export interface NotificationActions {
  logAndError: (error: unknown, defaultMessage?: string) => void
  error: (error: unknown, defaultMessage?: string) => void
  success: (text: string) => void
  show: (type: string | NotificationTypes, text: string) => void
}

export const NotificationsContext = createContext<NotificationActions | null>(null)
