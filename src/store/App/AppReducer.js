import { SET_ERROR , SET_ADMIN } from '../types'

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
    default: 
      return state
  }
}