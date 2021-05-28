import { apiFetchAuth } from '../service/api'

const addProduct = async (product) => {
  try {
    let contentToReturn
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
    const { success , content , message } = await apiFetchAuth('/products/create',productToSend,'POST')
    if(!success){
      throw new Error(message)
    }
    contentToReturn = content
    if(product.file){
      const formDataFile = new FormData()
      formDataFile.append('image',product.file)
      const { success:successFile , content:contentFile , message:messageFile } = await apiFetchAuth(`/products/uploadPhoto/${content._id}`,formDataFile,'PUT')
      if(!successFile){
        throw new Error(messageFile)
      }
      contentToReturn = contentFile
    }
    if(product.slides.length || product.imagesToDelete.length){
      const formDataSlides = new FormData()
      for(let slide of product.slides){
        formDataSlides.append('image',slide)
      }
      formDataSlides.append('imagesToDelete',JSON.stringify(product.imagesToDelete))
      const { success:successSlides , content:contentSlides , message:messageSlides } = await apiFetchAuth(`/products/uploadSlides/${content._id}`,formDataSlides,'PUT')
      if(!successSlides){
        throw new Error(messageSlides)
      }
      return contentSlides
    }
    return contentToReturn
  } catch (error) {
    throw error
  }
}

export default addProduct