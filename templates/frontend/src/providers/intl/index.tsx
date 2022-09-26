import { IntlErrorCode } from '@formatjs/intl'
import React, { useCallback } from 'react'
import { IntlProvider as Provider } from 'react-intl'

import config from '~/config'

export const IntlProvider: React.FC = ({ children }) => {
  const onError = useCallback((error) => {
    if (error.code === IntlErrorCode.MISSING_TRANSLATION) {
      if (config.IS_DEVELOPMENT) {
        /* do nothing */
      } else {
        console.error(error)
        // TODO replace with logger
      }
    } else {
      console.error(error) // TODO replace with logger
    }
  }, [])

  return (
    <Provider locale="en-US" onError={onError}>
      {children}
    </Provider>
  )
}
