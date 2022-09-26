import { ApolloServer } from 'apollo-server-express'

import { apolloSentryPlugin } from '~/lib'
import { schema } from '~/schema'

import { createContext } from './context'

export const createServer = () =>
  new ApolloServer({
    schema,
    context: createContext,
    plugins: [apolloSentryPlugin],
  })
