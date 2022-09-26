import { readFileSync } from 'fs'

import { makeExecutableSchema } from 'graphql-tools'

import modulesSchema from '~/modules'

const typeDefs = readFileSync('./src/generated/merged.graphql', 'utf-8')

export const schema = makeExecutableSchema({
  typeDefs,
  ...modulesSchema,
})
