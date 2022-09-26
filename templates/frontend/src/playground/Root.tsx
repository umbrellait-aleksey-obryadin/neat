import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import { Info } from './pages'
import { Main } from './pages/Main'

export const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact component={Main} path="/" />
        <Route path="/:id">
          <Info />
        </Route>
      </Switch>
    </Router>
  )
}
