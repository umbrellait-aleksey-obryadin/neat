import React, { useMemo } from 'react'

import { logger, createLogger } from './Logger'

export const LoggerContext = React.createContext<typeof logger>(logger)

interface Props {
  children: React.ReactNode
  extras: Record<string, unknown>
}

export const useLogger = () => React.useContext(LoggerContext)

export const LoggerProvider = ({ children, extras }: Props) => {
  const logger = useMemo(() => createLogger({ extras }), [extras])

  return <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
}
