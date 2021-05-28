import { apiFetchAuth } from '../service/api'

const removeCategory = async id => {
  try {
    const { success , content , message } = await apiFetchAuth(`/categories/deleteById/${id}`,null,'DELETE')
    if(success){
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default removeCategory