import { apiFetch } from '../service/api'
import formatDate from '../service/formatDate'

const fetchProduct = async id => {
  try {
    const { success , content , message } = await apiFetch(`/products/getById/${id}`)
    if(success){
      return {
        ...content,
        createdAt: formatDate(content.createdAt),
        updatedAt: formatDate(content.updatedAt),
      }
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default fetchProduct