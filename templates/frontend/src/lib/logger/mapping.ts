import * as Sentry from '@sentry/react'

import { Level } from './types'

export const CONSOLE_MAPPING: { [key in Level]: Function } = {
  [Level.info]: console.info,
  [Level.error]: console.error,
  [Level.fatal]: console.error,
  [Level.warn]: console.warn,
}

export const SENTRY_LEVEL_MAPPING: { [key in Level]: Sentry.Severity } = {
  [Level.info]: Sentry.Severity.Info,
  [Level.error]: Sentry.Severity.Error,
  [Level.fatal]: Sentry.Severity.Fatal,
  [Level.warn]: Sentry.Severity.Warning,
}
