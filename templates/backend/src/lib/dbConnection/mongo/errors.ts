/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseError } from '~/lib/dbConnection/errors'

export enum ErrorMessages {
  NotFound = 'NOT_FOUND',
  MongoServerError = 'MONGO_SERVER_ERROR',
}

export class ServerError extends BaseError<ErrorMessages> {
  constructor(error?: any) {
    super(ErrorMessages.MongoServerError, error)
  }
}

export class NotFoundError extends BaseError<ErrorMessages> {
  constructor(error?: any) {
    super(ErrorMessages.NotFound, error)
  }
}
