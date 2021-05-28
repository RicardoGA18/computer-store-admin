import { apiFetchAuth } from '../service/api'
import formatDate from '../service/formatDate'

const updateCategory = async (category) => {
  try {
    if(category.file){
      const formData = new FormData()
      formData.append('image',category.file)
      const { success:succcessImage , message:messageImage } = await apiFetchAuth(`/categories/uploadPhoto/${category._id}`,formData,'PUT')
      if(!succcessImage){
        throw new Error(messageImage)
      }
    }
    const categoryToSend = {
      name: category.name
    }
    const { success , content , message } = await apiFetchAuth(`/categories/updateById/${category._id}`,categoryToSend,'PUT')
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

export default updateCategory