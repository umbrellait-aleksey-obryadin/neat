import React from 'react'

import { Snackbar, Button } from '~/lib/elsa-ui'
import { useLogger } from '~/lib/logger'

import { NotificationsProvider } from '../NotificationsProvider'
import { useNotify as useNotifyBase } from '../useNotify'

export const ExampleNotify: React.FC = () => {
  const logger = useLogger()

  return (
    <NotificationsProvider logger={logger.error} renderItem={Snackbar}>
      <App />
    </NotificationsProvider>
  )
}

const useNotify = () => {
  const notify = useNotifyBase()
  const logger = useLogger()

  return {
    logAndError: notify.logAndError,
    error: notify.error,
    success: notify.success,
    // add custom notify
    info: (text: string) => {
      logger.info(text)
      notify.show('info', text)
    },
  }
}

const App: React.FC = () => {
  const notify = useNotify()
  const test = () => {
    notify.info('this is info')
  }

  const test2 = () => {
    notify.error('this is error', 'this is error')
  }

  return (
    <div style={{ display: 'flex', marginBottom: '40px' }}>
      <Button style={{ marginRight: '20px' }} onClick={test}>
        Show info notification
      </Button>
      <Button onClick={test2}>Show error notification </Button>
    </div>
  )
}
