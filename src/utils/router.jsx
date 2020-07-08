
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import OBSView from '../pages/OBSView'
import Admin from '../pages/Admin'

import 'bootstrap/dist/css/bootstrap.min.css'

export default () => (
  <>
    <BrowserRouter basename={process.env.REACT_APP_ROOT_DIRECTORY}>
      <Route exact path='/' component={OBSView} />
      <Route path='/admin' component={Admin} />
    </BrowserRouter>
  </>
)
