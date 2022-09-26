import * as dotEnv from 'dotenv'
import { object, number, string } from 'yup'

dotEnv.config()

const schema = object({
  PORT: number().required(),
  SENTRY_URL: string().required(),
  NODE_ENV: string().required(),
})

const schemaValid = schema.validateSync(process.env)

if (!schemaValid) {
  process.exit(1)
}

export const config = {
  port: schemaValid.PORT,
  sentry: {
    dsn: schemaValid.SENTRY_URL,
    isEnabled: ['production', 'staging'].includes(schemaValid.NODE_ENV) && schemaValid.SENTRY_URL,
  },
  currentEnv: schemaValid.NODE_ENV,
  isDevelopment: schemaValid.NODE_ENV === 'development',
  isSocketEnabled: schemaValid.NODE_ENV !== 'development',
}
