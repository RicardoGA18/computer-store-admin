import { apiFetchAuth } from '../service/api'

const fetchPurchases = async () => {
  try {
    const {success , content , message} = await apiFetchAuth('/payments/getAllPurchases')
    if(success){
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default fetchPurchases