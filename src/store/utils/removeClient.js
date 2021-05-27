import { apiFetchAuth } from '../service/api'

const removeClient = async id => {
  try {
    const { success , content , message } = await apiFetchAuth(`/clients/deleteById/${id}`,null,'DELETE')
    if(success){
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default removeClient