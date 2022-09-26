import express from 'express'

import { createLogger } from '~/lib'

interface Request {
  req: express.Request
}

interface Context {
  logger: ReturnType<typeof createLogger>
}

type CreateContext = (context: Request) => Promise<Context>

export const createContext: CreateContext = async () => {
  const logger = createLogger(null)

  return { logger }
}
