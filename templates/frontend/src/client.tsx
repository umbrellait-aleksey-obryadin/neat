import React from 'react'
import ReactDOM from 'react-dom'

import { Root } from '~/playground'

import { Providers } from './providers/Providers'

ReactDOM.render(
  <Providers>
    <Root />
  </Providers>,
  document.getElementById('root'),
)
