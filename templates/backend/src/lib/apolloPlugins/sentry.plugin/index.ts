import { ApolloServerPlugin, GraphQLRequestContext } from 'apollo-server-plugin-base'

import { config } from '~/config'
import { Sentry } from '~/lib'

export const apolloSentryPlugin = {
  requestDidStart: () => ({
    didEncounterErrors({ operation, errors, request }: GraphQLRequestContext) {
      if (!operation || !errors) {
        return
      }

      for (const err of errors) {
        config.sentry.isEnabled
          ? Sentry.withScope((scope) => {
              scope.setTag('kind', operation.operation)
              scope.setExtra('query', request.query)
              scope.setExtra('variables', request.variables)

              if (err.path) {
                scope.addBreadcrumb({
                  category: 'query-path',
                  message: err.path.join(' > '),
                  level: Sentry.Severity.Debug,
                })
              }

              Sentry.captureException(err)
            })
          : console.error(err)
      }
    },
  }),
} as ApolloServerPlugin
