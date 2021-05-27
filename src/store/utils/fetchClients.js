import { apiFetchAuth } from '../service/api'

const fetchClients = async () => {
  try {
    const { success , content , message } = await apiFetchAuth('/clients/getAll')
    if(success){
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default fetchClients