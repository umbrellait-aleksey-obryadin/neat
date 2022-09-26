## Neat notify

Implementation of notify library used to display notifications.
Environment: mobile, frontend.

### Installation

```js
import { useNotify } from '@neat/frontend'
```

### Usage

Neat notify provides `useNotify` hook which allows to stack notifications on top of each other thanks to promise Ref.current in show function.
`notify` has `error`, `success`, `logAndError` types out of the box.

1. Basic usage:

```jsx
const logger = useLogger() // in order to use automatic metadata logging, you must use hook from @neat/frontend to get logger

return (
  // renderItem will display notification text
  <NotificationsProvider logger={logger.error} renderItem={Snackbar}>
    <Component />
  </NotificationsProvider>
)

const Component = () => {
  const notify = useNotify()

  notify.success('Success')
}
```

2. Customize your own type with notify.show function:

```jsx
const useNotify = () => {
  const notify = useNotifyBase() // use useNotify hook form library as base
  const logger = useLogger()

  return {
    // you can create your own type and add here
    info: (text: string) => {
      logger.info(text)
      notify.show('info', text)
    },
  }
}

const notify = useNotify()

...notify.info('Info')
```
