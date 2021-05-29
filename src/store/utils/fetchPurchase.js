import { apiFetchAuth } from '../service/api'

const fetchPurchase = async (id) => {
  try {
    const { success , content , message } = await apiFetchAuth(`/payments/getPurchaseById/${id}`)
    if(success) {
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default fetchPurchase