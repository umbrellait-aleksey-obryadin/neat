import { config } from '~/config'
import { Sentry } from '~/lib'

export const createLogger = <T>(user: T) => ({
  error: (error: unknown, extras?: Record<string, unknown>) => {
    config.sentry.isEnabled
      ? Sentry.captureException(error, (scope) => {
          if (extras) scope.setExtras(extras)

          scope.setLevel(Sentry.Severity.Error)
          scope.setUser(user)

          return scope
        })
      : console.error({ error, extras, user })
  },
})
