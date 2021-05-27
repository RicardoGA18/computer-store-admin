import React , { useContext } from 'react'
import { Route , Redirect } from 'react-router-dom'
import AppContext from '../store/App/AppContext'

const LogRoute = ({ component, ...options }) => {
  const { admin } = useContext(AppContext)

  if(admin){
    return <Redirect to="/" />
  }else{
    return <Route {...options} component={component} />
  }
}

export default LogRoute