import { SET_PURCHASE , SET_PURCHASES , DELETE_PRODUCT , ADD_PRODUCT , SET_PRODUCT , DELETE_CATEGORY , ADD_CATEGORY , SET_CATEGORY , ADD_CLIENT , SET_ERROR , SET_ADMIN , SET_CATEGORIES , SET_PRODUCTS , SET_CLIENTS , SET_CLIENT, DELETE_CLIENT } from '../types'

export default (state,action) => {
  const {payload,type} = action
  switch(type){
    case SET_ERROR: 
      return {
        ...state,
        error: payload
      }
    case SET_ADMIN:
      return {
        ...state,
        admin: payload
      }
    case SET_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    case SET_PRODUCTS:
      return {
        ...state,
        products: payload
      }
    case SET_PURCHASES:
      return {
        ...state,
        purchases: payload
      }
    case SET_PURCHASE:
      return {
        ...state,
        purchase: payload
      }
    case SET_CLIENTS:
      return {
        ...state,
        clients: payload
      }
    case SET_CLIENT:
      return {
        ...state,
        client: payload
      }
    case ADD_CLIENT:
      const secureClients = JSON.parse(JSON.stringify(state.clients))
      secureClients.push(payload)
      return {
        ...state,
        clients: secureClients
      }
    case DELETE_CLIENT:
      let copyClients = JSON.parse(JSON.stringify(state.clients))
      copyClients = copyClients.filter(client => client._id !== payload.clientId)
      return {
        ...state,
        clients: copyClients
      }
    case SET_CATEGORY: 
      return {
        ...state,
        category: payload
      }
    case ADD_CATEGORY:
      const secureCategories = JSON.parse(JSON.stringify(state.categories))
      secureCategories.push(payload)
      return {
        ...state,
        categories: secureCategories
      }
    case DELETE_CATEGORY:
      let copyCategories = JSON.parse(JSON.stringify(state.categories))
      copyCategories = copyCategories.filter(cat => cat._id !== payload.categoryId)
      return {
        ...state,
        categories: copyCategories
      }
    case SET_PRODUCT:
      return {
        ...state,
        product: payload,
      }
    case ADD_PRODUCT:
      const secureProducts = JSON.parse(JSON.stringify(state.products))
      secureProducts.push(payload)
      return {
        ...state,
        products: secureProducts,
      }
    case DELETE_PRODUCT:
      let copyProducts = JSON.parse(JSON.stringify(state.products))
      copyProducts = copyProducts.filter(prod => prod._id !== payload.productId)
      return {
        ...state,
        products: copyProducts,
      }
    default: 
      return state
  }
}