import { apiFetchAuth } from '../service/api'

const addCategory = async category => {
  try {
    const categoryToSend = {
      name: category.name
    }
    const { success , content , message } = await apiFetchAuth('/categories/create',categoryToSend,'POST')
    if(!success){
      throw new Error(message)
    }
    if(category.file){
      const formData = new FormData()
      formData.append('image',category.file)
      const { success:successImage , content:contentImage , message:messageImage } = await apiFetchAuth(`/categories/uploadPhoto/${content._id}`,formData,'PUT')
      if(successImage){
        return contentImage
      }
      throw new Error(messageImage)
    }
    return content
  } catch (error) {
    throw error
  }
}

export default addCategory