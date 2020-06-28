
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import OBSView from '../pages/OBSView'
import Admin from '../pages/Admin'

export default () => (
  <>
    <BrowserRouter>
      <Route exact path='/' component={OBSView} />
      <Route path='/admin' component={Admin} />
    </BrowserRouter>
  </>
)
