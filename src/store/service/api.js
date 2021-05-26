import axios from 'axios'

const baseUrl = 'https://computer-store-back.herokuapp.com/api'

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
    
  } catch (error) {
    
  }
}