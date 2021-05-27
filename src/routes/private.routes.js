import React , { useContext } from 'react'
import { Route , Redirect } from 'react-router-dom'
import AppContext from '../store/App/AppContext'

const PrivateRoute = ({component , ...options}) => {
  const { admin } = useContext(AppContext)

  if(admin){
    return <Route {...options} component={component} />
  }else{
    return <Redirect to="/iniciar-sesion" />
  }
}

export default PrivateRoute