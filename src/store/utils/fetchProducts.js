import { apiFetch } from '../service/api'

const fetchProducts = async () => {
  try {
    const { success , content , message } = await apiFetch('/products/getAll')
    if(success){
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default fetchProducts