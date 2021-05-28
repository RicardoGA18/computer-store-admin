import { apiFetch } from '../service/api'
import formatDate from '../service/formatDate'

const fetchCategory = async id => {
  try {
    const { success , content , message } = await apiFetch(`/categories/getById/${id}`)
    if(success){
      return {
        ...content,
        createdAt: formatDate(content.createdAt),
        updatedAt: formatDate(content.updatedAt)
      }
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default fetchCategory