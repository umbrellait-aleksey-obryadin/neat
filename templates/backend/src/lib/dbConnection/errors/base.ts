/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloError } from 'apollo-server-express'

export class BaseError<T extends string> extends ApolloError {
  constructor(errorMessage: T, error?: any) {
    super(errorMessage, errorMessage, { error })
  }
}
