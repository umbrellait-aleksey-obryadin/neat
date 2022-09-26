/* eslint-disable @typescript-eslint/no-throw-literal */
import {
  OptionalId,
  Db,
  ObjectId,
  FilterQuery,
  FindOneAndUpdateOption,
  FindOneAndDeleteOption,
  UpdateQuery,
  FindOneOptions,
} from 'mongodb'

import { NotFoundError, ServerError } from './errors'

export const createCollection = (db: Db) => <TSchema extends { _id?: ObjectId }>(name: string) => {
  const connector = db.collection<TSchema>(name)

  return {
    find: connector.find.bind(connector),
    findOne: connector.findOne.bind(connector),
    findOneAndUpdate: connector.findOneAndUpdate.bind(connector),
    findOneAndDelete: connector.findOneAndDelete.bind(connector),
    deleteMany: connector.deleteMany.bind(connector),
    deleteOne: connector.deleteOne.bind(connector),
    insertOne: connector.insertOne.bind(connector),
    insertMany: connector.insertMany.bind(connector),
    updateMany: connector.updateMany.bind(connector),
    updateOne: connector.updateOne.bind(connector),

    findOneOrThrow: async <T = TSchema>(
      filter: FilterQuery<TSchema>,
      options?: FindOneOptions<T extends TSchema ? TSchema : T>,
    ) => {
      const value = await connector.findOne<T>(filter, options)

      if (!value) {
        throw new NotFoundError()
      }

      return value
    },

    findOneAndUpdateOrThrow: async (
      filter: FilterQuery<TSchema>,
      update: UpdateQuery<TSchema> | TSchema,
      options?: FindOneAndUpdateOption<TSchema>,
    ) => {
      const { ok, value, lastErrorObject } = await connector.findOneAndUpdate(filter, update, {
        ...options,
        returnOriginal: options?.returnOriginal ?? false,
      })

      if (!ok || !value) {
        throw new NotFoundError(lastErrorObject)
      }

      return value
    },

    findOneAndDeleteOrThrow: async (
      filter: FilterQuery<TSchema>,
      options?: FindOneAndDeleteOption<TSchema>,
    ) => {
      const { ok, value, lastErrorObject } = await connector.findOneAndDelete(filter, options)

      if (!ok || !value) {
        throw new NotFoundError(lastErrorObject)
      }

      return value
    },

    insertOneAndReturn: async (data: OptionalId<TSchema>) => {
      const { insertedCount, insertedId } = await connector.insertOne(data)

      if (!insertedCount) {
        throw new ServerError()
      }

      return (await connector.findOne(insertedId)) as NonNullable<TSchema>
    },
  }
}
