/* eslint-disable @typescript-eslint/no-require-imports */

import glob from 'glob'
import { merge } from 'lodash'

const requireAll = (pattern: string) => {
  return merge(
    {},
    ...glob
      .sync(pattern, {
        cwd: __dirname,
        absolute: true,
      })
      .map(require),
  )
}

const queries = requireAll('./**/queries/*.{t,j}s')
const mutations = requireAll('./**/mutations/*.{t,j}s')
const subscriptions = requireAll('./**/subscriptions/*.{t,j}s')

export default {
  resolvers: {
    Query: queries,
    Mutation: mutations,
    Subscription: subscriptions,
  },
}
