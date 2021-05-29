// React Context
import React , { useReducer } from 'react'
import AppReducer from './AppReducer'
import AppContext from './AppContext'

// Utils
import { getAdmin } from '../service/manageLocalStorage'
import loginUser from '../utils/loginUser'
import logoutUser from '../utils/logoutUser'
import fetchCategories from '../utils/fetchCategories'
import fetchProducts from '../utils/fetchProducts'
import fetchClients from '../utils/fetchClients'
import fetchAdmin from '../utils/fetchAdmin'
import updateAdmin from '../utils/updateAdmin'
import fetchClient from '../utils/fetchClient'
import updateClient from '../utils/updateClient'
import addClient from '../utils/addClient'
import removeClient from '../utils/removeClient'
import fetchCategory from '../utils/fetchCategory'
import updateCategory from '../utils/updateCategory'
import addCategory from '../utils/addCategory'
import removeCategory from '../utils/removeCategory'
import fetchProduct from '../utils/fetchProduct'
import updateProduct from '../utils/updateProduct'
import addProduct from '../utils/addProduct'
import removeProduct from '../utils/removeProduct'
import fetchPurchases from '../utils/fetchPurchases'
import fetchPurchase from '../utils/fetchPurchase'
// Types
import { SET_PURCHASE , SET_PURCHASES , DELETE_PRODUCT , ADD_PRODUCT , SET_PRODUCT , DELETE_CATEGORY , ADD_CATEGORY , SET_CATEGORY , DELETE_CLIENT , ADD_CLIENT , SET_ERROR , SET_ADMIN , SET_CATEGORIES , SET_PRODUCTS , SET_CLIENTS , SET_CLIENT } from '../types'

const AppState = props => {
  const INITIAL_STATE = {
    categories: [],
    category: null,
    products: [],
    product: null,
    clients: [],
    client: null,
    admin: getAdmin(),
    error: null,
    purchases: [],
    purchase: null
  }

  const [state,dispatch] = useReducer(AppReducer,INITIAL_STATE)
  
  // Purchases
  const getPurchase = async (id) => {
    try {
      const purchase = await fetchPurchase(id)
      dispatch({
        type: SET_PURCHASE,
        payload: purchase
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  const getPurchases = async () => {
    try {
      const purchases = await fetchPurchases()
      dispatch({
        type: SET_PURCHASES,
        payload: purchases
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  // Clients
  const getClients = async () => {
    try {
      const clients = await fetchClients()
      dispatch({
        type: SET_CLIENTS,
        payload: clients
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  const getClient = async id => {
    try {
      const client = await fetchClient(id)
      dispatch({
        type: SET_CLIENT,
        payload: client
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  const setClient = async client => {
    try {
      const newClient = await updateClient(client)
      dispatch({
        type: SET_CLIENT,
        payload: newClient
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  const createClient = async client => {
    try {
      const newClient = await addClient(client)
      dispatch({
        type: ADD_CLIENT,
        payload: newClient
      })
      return true
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
      return null
    }
  }

  const deleteClient = async id => {
    try {
      const respond = await removeClient(id)
      dispatch({
        type: DELETE_CLIENT,
        payload: respond
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  // Categories
  const getCategories = async () => {
    try {
      const categories = await fetchCategories()
      dispatch({
        type: SET_CATEGORIES,
        payload: categories
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  const getCategory = async id => {
    try {
      const category = await fetchCategory(id)
      dispatch({
        type: SET_CATEGORY,
        payload: category
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  const setCategory = async category => {
    try {
      const newCategory = await updateCategory(category)
      dispatch({
        type: SET_CATEGORY,
        payload: newCategory
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  const createCategory = async category => {
    try {
      const newCategory = await addCategory(category)
      dispatch({
        type: ADD_CATEGORY,
        payload: newCategory
      })
      return true
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
      return null
    }
  }

  const deleteCategory = async id => {
    try {
      const respond = await removeCategory(id)
      dispatch({
        type: DELETE_CATEGORY,
        payload: respond
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  // Products
  const getProducts = async () => {
    try {
      const products = await fetchProducts()
      dispatch({
        type: SET_PRODUCTS,
        payload: products
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  const getProduct = async (id) => {
    try {
      const product = await fetchProduct(id)
      dispatch({
        type: SET_PRODUCT,
        payload: product,
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  const setProduct = async (product) => {
    try {
      const newProduct = await updateProduct(product)
      dispatch({
        type: SET_PRODUCT,
        payload: newProduct
      })
      return true
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
      return null
    }
  }

  const createProduct = async product => {
    try {
      const newProduct = await addProduct(product)
      dispatch({
        type: ADD_PRODUCT,
        payload: newProduct
      })
      return true
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
      return null
    }
  }

  const deleteProduct = async id => {
    try {
      const respond = await removeProduct(id)
      dispatch({
        type: DELETE_PRODUCT,
        payload: respond
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  // Admin
  const setAdmin = admin => {
    dispatch({
      type: SET_ADMIN,
      payload: admin
    })
  }

  const getAdministrator = async id => {
    try {
      const admin = await fetchAdmin(id)
      dispatch({
        type: SET_ADMIN,
        payload: admin
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

  const setAdministrator = async admin => {
    try {
      const newAdmin = await updateAdmin(admin)
      dispatch({
        type: SET_ADMIN,
        payload: newAdmin
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }

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

  const signOut = () => {
    logoutUser()
    dispatch({
      type: SET_ADMIN,
      payload: null
    })
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
      purchases: state.purchases,
      purchase: state.purchase,
      signIn,
      setError,
      setAdmin,
      signOut,
      getCategories,
      getProducts,
      getClients,
      getClient,
      getAdministrator,
      setAdministrator,
      setClient,
      createClient,
      deleteClient,
      getCategory,
      setCategory,
      createCategory,
      deleteCategory,
      getProduct,
      setProduct,
      createProduct,
      deleteProduct,
      getPurchases,
      getPurchase,
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState