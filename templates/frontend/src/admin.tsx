import React from 'react'
import ReactDOM from 'react-dom'

import { Admin } from '~/modules/Admin'
import { Providers } from '~/providers/Providers'

ReactDOM.render(
  <Providers>
    <Admin />
  </Providers>,
  document.getElementById('root'),
)
