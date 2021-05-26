// React Context
import React , { useReducer } from 'react'
import AppReducer from './AppReducer'
import AppContext from './AppContext'

// Utils
import loginUser from '../utils/loginUser'

// Types
import { SET_ERROR , SET_ADMIN } from '../types'

const AppState = props => {
  const INITIAL_STATE = {
    categories: [],
    category: null,
    products: [],
    product: null,
    clients: [],
    client: null,
    admin: null,
    error: null,
  }

  const [state,dispatch] = useReducer(AppReducer,INITIAL_STATE)
  
  // Auth
  const signIn = async admin => {
    const respond = await loginUser(admin)
    if(respond.error && !respond.admin){
      dispatch({
        type: SET_ERROR,
        payload: respond.error
      })
      return null
    }else if(respond.admin && !respond.error){
      dispatch({
        type: SET_ADMIN,
        payload: respond.admin
      })
      return true
    }else{
      console.log('Patrón no esperado en AppState/signIn')
      return null
    }
  }

  // Error
  const setError = error => {
    dispatch({
      type: SET_ERROR,
      payload: error
    })
  }
  
  return (
    <AppContext.Provider value={{ 
      categories: state.categories,
      category: state.category,
      products: state.products,
      product: state.product,
      clients: state.clients,
      client: state.client,
      admin: state.admin,
      error: state.error,
      signIn,
      setError,
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState