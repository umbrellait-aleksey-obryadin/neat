import { Db, MongoClient } from 'mongodb'

import { createCollection } from './createMongoCollection'

const createConnector = <T>(db: Db, collectionName: string) => {
  const collection = createCollection(db)

  return collection<T>(collectionName)
}

export const createMongoConnection = async (mongoUrl: string, mongoDbName: string) => {
  const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  const db = client.db(mongoDbName)

  return {
    client,
    db,
    createConnector: <T>(collectionName: string) => createConnector<T>(db, collectionName),
  }
}
