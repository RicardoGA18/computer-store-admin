import { ACCESS_TOKEN , COMPUTER_STORE_ADMIN } from '../types'

export const setAdmin = admin => {
  window.localStorage.setItem(COMPUTER_STORE_ADMIN,JSON.stringify(admin))
}

export const getAdmin = () => {
  const admin = window.localStorage.getItem(COMPUTER_STORE_ADMIN)
  if(admin){
    return JSON.parse(admin)
  }
  return null
}

export const setToken = token => {
  window.localStorage.setItem(ACCESS_TOKEN,token)
}

export const getToken = () => {
  const token = window.localStorage.getItem(ACCESS_TOKEN)
  return token
}