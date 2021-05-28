import { apiFetchAuth } from '../service/api'
import formatDate from '../service/formatDate'

const updateProduct = async (product) => {
  try {
    if(product.file){
      const formDataFile = new FormData()
      formDataFile.append('image',product.file)
      const { success:successFile , message:messageFile } = await apiFetchAuth(`/products/uploadPhoto/${product._id}`,formDataFile,'PUT')
      if(!successFile){
        throw new Error(messageFile)
      }
    }
    if(product.slides.length || product.imagesToDelete.length){
      const formDataSlides = new FormData()
      for(let slide of product.slides){
        formDataSlides.append('image',slide)
      }
      formDataSlides.append('imagesToDelete',JSON.stringify(product.imagesToDelete))
      const { success:successSlides , message:messageSlides } = await apiFetchAuth(`/products/uploadSlides/${product._id}`,formDataSlides,'PUT')
      if(!successSlides){
        throw new Error(messageSlides)
      }
    }
    const productToSend = {
      name: product.name,
      categoryId: product.categoryId,
      description: product.description,
      officialInformation: product.officialInformation,
      price: product.price,
      stock: product.stock,
      discount: product.discount,
      details: product.details,
    }
    const { success , content , message } = await apiFetchAuth(`/products/updateById/${product._id}`,productToSend,'PUT')
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

export default updateProduct