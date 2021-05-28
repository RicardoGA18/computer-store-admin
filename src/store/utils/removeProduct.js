import { apiFetchAuth } from '../service/api'

const removeProduct = async id => {
  try {
    const { success , content , message } = await apiFetchAuth(`/products/deleteById/${id}`,null,'DELETE')
    if(success){
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default removeProduct