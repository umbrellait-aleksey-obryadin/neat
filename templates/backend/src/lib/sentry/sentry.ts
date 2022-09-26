import * as Sentry from '@sentry/node'

import { config } from '~/config'

config.sentry.isEnabled && Sentry.init({ dsn: config.sentry.dsn })

export { Sentry }
