import { apiFetchAuth } from '../service/api'

const updateAdmin = async (admin) => {
  try {
    if(admin.file){
      const formData = new FormData()
      formData.append('image',admin.file)
      const { success:successAvatar , message:messageAvatar } = await apiFetchAuth(`/clients/uploadAvatar/${admin._id}`,formData,'PUT')
      if(!successAvatar){
        throw new Error(messageAvatar)
      }
    }
    const adminToSend = {
      name: admin.name,
      lastName: admin.lastName,
      email: admin.email,
    }
    const { success , content , message } = await apiFetchAuth(`/clients/updateById/${admin._id}`,adminToSend,'PUT')
    if(success){
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default updateAdmin