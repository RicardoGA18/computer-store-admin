import axios from 'axios'
import { getToken } from './manageLocalStorage'

const baseUrl = 'https://computer-store-back.herokuapp.com/api'
// const baseUrl = 'http://127.0.0.1:8000/api'

export const apiFetch = async (url,body=null,method='GET') => {
  try {
    const { data } = await axios({
      method: method,
      data: body,
      url: `${baseUrl}${url}`
    })
    return data
  } catch (error) {
    if(error.response.data){
      return error.response.data
    }
    throw error
  }
}

export const apiFetchAuth = async (url,body=null,method='GET') => {
  try {
    const token = getToken()
    if(!token){
      const error = new Error('No token provided')
      throw error
    }
    const { data } = await axios({
      method: method,
      data: body,
      url: `${baseUrl}${url}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    if(error.response.data){
      console.log(error.response.data)
      return error.response.data
    }
    throw error
  }
}