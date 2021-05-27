import React from 'react'
import Navigation from '../components/Navigation'
import { BrowserRouter , Switch , Redirect } from 'react-router-dom'
import PrivateRoute from '../routes/private.routes'
import LogRoute from '../routes/log.routes'

import General from '../pages/General'
import Account from '../pages/Account'
import Store from '../pages/Store'
import Products from '../pages/Products'
import Categories from '../pages/Categories'
import Clients from '../pages/Clients'
import Login from '../pages/Login'
import useStyles from '../components/styles'

import UpdateClient from '../components/clients/UpdateClient'
import CreateClient from '../components/clients/CreateClient'

function DashBoardView() {
  const classes = useStyles()

  return (
    <div className={classes.appRoot}>
      <BrowserRouter>
        <Navigation />
        <div className={classes.fullContainer}>
          <div className={classes.appBarSpacer}></div>
          <Switch>
            <PrivateRoute exact path="/" component={General}/>
            <PrivateRoute exact path="/cuenta" component={Account}/>
            <PrivateRoute exact path="/tienda" component={Store}/>
            {/* Products */}
            <PrivateRoute exact path="/productos" component={Products}/>
            {/* Categories */}
            <PrivateRoute exact path="/categorias" component={Categories}/>
            {/* Clients */}
            <PrivateRoute exact path="/clientes" component={Clients}/>
            <PrivateRoute exact path="/clientes/editar/:id" component={UpdateClient}/>
            <PrivateRoute exact path="/clientes/crear" component={CreateClient}/>
            {/* Log */}
            <LogRoute exact path="/iniciar-sesion" component={Login}/>
            <Redirect path="/**" to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default DashBoardView
