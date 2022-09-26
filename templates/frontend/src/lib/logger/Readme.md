## Neat logger

Implementation of `logger` interface used to log errors to different targets. Environment-independent: mobile, frontend, backend.

### Installation

```js
import { useLogger } from '@neat/frontend'
```

### Usage

Neat logger provides `logger` object which allows to log different data to targets such as Sentry or console.
`logger` has `error`, `warn`, `info`, `fatal` methods out of the box.

1. Basic usage

# Initialization

```jsx
Logger.init({
  // during initialization an array of transports must be provided

  transports: [
    new Logger.transports.Sentry({
      dsn: '...'
    }),
    // you can create your own transports and add here
  ],
})

... logger.info('error', { key: 'multiple params' })
```

2. All errors might have additional meta data logged injected through React Context
   Example of usage:

```jsx
return (
  <LoggerContext extras={{ userId: 123 }}>
    <Component />
  </LoggerContext>
)

const Component = () => {
  const logger = useLogger() // in order to use automatic metadata logging, you must use hook to get logger

  logger.error('error') // { userId: 123 } is logged as a metadata to all errors inside LoggerContext React subtree
}
```
