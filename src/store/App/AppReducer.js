import { ADD_CLIENT , SET_ERROR , SET_ADMIN , SET_CATEGORIES , SET_PRODUCTS , SET_CLIENTS , SET_CLIENT, DELETE_CLIENT } from '../types'

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
      console.log(copyClients)
      console.log(payload)
      copyClients = copyClients.filter(client => client._id !== payload.clientId)
      return {
        ...state,
        clients: copyClients
      }
    default: 
      return state
  }
}