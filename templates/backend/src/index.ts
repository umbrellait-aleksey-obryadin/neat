import fs from 'fs'

import express from 'express'

import { config } from '~/config'

import { createServer } from './server'

const handleOn = config.isDevelopment ? config.port : './server.sock'
const listenerMessage = config.isDevelopment
  ? `Server running on http://localhost:${config.port}`
  : `Server running on http://unix:${__dirname}/server.sock:/`

const run = async () => {
  const server = createServer()
  const app = express()

  server.applyMiddleware({
    app,
    path: '/',
  })

  app.listen(handleOn, () => {
    if (config.isSocketEnabled) {
      fs.chmodSync('./server.sock', '777')
    }
    console.log(listenerMessage)
  })
}

run().catch((error) => {
  console.log(error)
  process.exit(1)
})
