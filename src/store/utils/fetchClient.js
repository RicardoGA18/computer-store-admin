import { apiFetchAuth } from '../service/api'

const fetchClient = async id => {
  try {
    const { success , content , message } = await apiFetchAuth(`/clients/getById/${id}`)
    if(success){
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default fetchClient