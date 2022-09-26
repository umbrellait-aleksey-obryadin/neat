import React from 'react'

import config from '~/config'
import { Button } from '~/lib/elsa-ui'
import { Logger } from '~/lib/logger/Logger'
import { useLogger } from '~/lib/logger/LoggerProvider'

Logger.init({
  transports: [
    new Logger.transports.Console(),
    new Logger.transports.Sentry({
      dsn: config.SENTRY_URL,
      environment: 'development',
    }),
  ],
})

export const ExampleLogger: React.FC = () => {
  const logger = useLogger()

  const test = () => {
    logger.info('err')
  }

  return (
    <div>
      <Button onClick={test}>send error</Button>
    </div>
  )
}
