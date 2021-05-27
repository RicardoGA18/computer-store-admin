import { apiFetch } from '../service/api'

const fetchCategories = async () => {
  try {
    const { success , content , message } = await apiFetch('/categories/getAll')
    if(success){
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default fetchCategories