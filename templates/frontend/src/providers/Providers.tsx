import { MuiThemeProvider } from '@material-ui/core'
import React from 'react'

import { LoggerProvider } from '~/lib/logger'
import { IntlProvider } from '~/providers/intl'
import { theme } from '~/styles'

export const Providers: React.FC = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <IntlProvider>
        <LoggerProvider extras={{ userId: '123' }}>{children}</LoggerProvider>
      </IntlProvider>
    </MuiThemeProvider>
  )
}
