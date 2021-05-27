import { apiFetchAuth } from '../service/api'

const updateClient = async (client) => {
  try {
    if(client.file){
      const formData = new FormData()
      formData.append('image',client.file)
      const { success:successAvatar , message:messageAvatar } = await apiFetchAuth(`/clients/uploadAvatar/${client._id}`,formData,'PUT')
      if(!successAvatar){
        throw new Error(messageAvatar)
      }
    }
    const clientToSend = {
      name: client.name,
      lastName: client.lastName,
      email: client.email
    }
    const { success , content , message } = await apiFetchAuth(`/clients/updateById/${client._id}`,clientToSend,'PUT') 
    if(success){
      return content
    }
    throw new Error(message)
  } catch (error) {
    throw error
  }
}

export default updateClient