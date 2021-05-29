import React from 'react'
import Navigation from '../components/Navigation'
import { BrowserRouter , Switch , Redirect } from 'react-router-dom'
import PrivateRoute from '../routes/private.routes'
import LogRoute from '../routes/log.routes'

import General from '../pages/General'
import Account from '../pages/Account'
import Sales from '../pages/Sales'
import Products from '../pages/Products'
import Categories from '../pages/Categories'
import Clients from '../pages/Clients'
import Login from '../pages/Login'
import useStyles from '../components/styles'

import UpdateClient from '../components/clients/UpdateClient'
import CreateClient from '../components/clients/CreateClient'
import UpdateCategory from '../components/categories/UpdateCategory'
import CreateCategory from '../components/categories/CreateCategory'
import UpdateProduct from '../components/products/UpdateProduct'
import CreateProduct from '../components/products/CreateProduct'
import Purchase from '../components/sales/Purchase'

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
            {/* Sales */}
            <PrivateRoute exact path="/ventas" component={Sales}/>
            <PrivateRoute exact path="/ventas/:id" component={Purchase}/>
            {/* Products */}
            <PrivateRoute exact path="/productos" component={Products}/>
            <PrivateRoute exact path="/productos/editar/:id" component={UpdateProduct}/>
            <PrivateRoute exact path="/productos/crear" component={CreateProduct}/>
            {/* Categories */}
            <PrivateRoute exact path="/categorias" component={Categories}/>
            <PrivateRoute exact path="/categorias/editar/:id" component={UpdateCategory}/>
            <PrivateRoute exact path="/categorias/crear" component={CreateCategory}/>
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
