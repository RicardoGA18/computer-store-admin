import React from 'react'
import Navigation from '../components/Navigation'
import { BrowserRouter , Switch , Route } from 'react-router-dom'

import General from '../pages/General'
import Account from '../pages/Account'
import Store from '../pages/Store'
import Products from '../pages/Products'
import Categories from '../pages/Categories'
import Clients from '../pages/Clients'
import Login from '../pages/Login'
import useStyles from '../components/styles'

function DashBoardView() {
  const classes = useStyles()

  return (
    <div className={classes.appRoot}>
      <BrowserRouter>
        <Navigation />
        <div className={classes.fullContainer}>
          <div className={classes.appBarSpacer}></div>
          <Switch>
            <Route exact path="/" component={General}/>
            <Route exact path="/cuenta" component={Account}/>
            <Route exact path="/tienda" component={Store}/>
            <Route exact path="/productos" component={Products}/>
            <Route exact path="/categorias" component={Categories}/>
            <Route exact path="/clientes" component={Clients}/>
            <Route exact path="/iniciar-sesion" component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default DashBoardView
