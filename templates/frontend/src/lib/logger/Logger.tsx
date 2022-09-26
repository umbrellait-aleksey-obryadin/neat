import * as SentryReact from '@sentry/react'

import { CONSOLE_MAPPING, SENTRY_LEVEL_MAPPING } from './mapping'
import { Transport, Level } from './types'

export class Console implements Transport {
  log(level: Level, payload: unknown, extras: unknown) {
    CONSOLE_MAPPING[level](payload, { extras })
  }
}

export class Sentry implements Transport {
  constructor(options: SentryReact.BrowserOptions) {
    SentryReact.init(options)
  }

  log(level: Level, payload: unknown, extras: Record<string, unknown>) {
    SentryReact.captureException(payload, { level: SENTRY_LEVEL_MAPPING[level], extra: extras })
  }
}

const loggerRef: { transports: Transport[] } = {
  transports: [],
}

const Logger = {
  init({ transports }: { transports: Transport[] }) {
    loggerRef.transports = transports
  },
  transports: {
    Console,
    Sentry,
  },
}

const createLog = (extras: unknown, level: Level) => (...args: unknown[]) => {
  loggerRef.transports.forEach((transport) => {
    transport.log(level, args, extras)
  })
}

const createLogger = ({ extras }: { extras: unknown }) => {
  return {
    error: createLog(extras, Level.error),
    fatal: createLog(extras, Level.fatal),
    warn: createLog(extras, Level.warn),
    info: createLog(extras, Level.info),
  }
}

const logger = createLogger({ extras: null })

export { Logger, logger, createLogger }
