import { apiFetch , apiFetchAuth } from '../service/api'

const addClient = async client => {
  try {
    if(client.pass1 !== client.pass2){
      throw new Error('Las contraseñas no coinciden')
    }
    const clientToSend = {
      name: client.name,
      lastName: client.lastName,
      email: client.email,
      password: client.pass1
    }
    const { success , content , message } = await apiFetch(`/auth/sign-up`,clientToSend,'POST')
    if(!success){
      throw new Error(message)
    }
    if(client.file){
      const formData = new FormData()
      formData.append('image',client.file)
      const { success:successAvatar , content:contentAvatar , message:messageAvatar } = await apiFetchAuth(`/clients/uploadAvatar/${content._id}`,formData,'PUT') 
      if(successAvatar){
        return contentAvatar
      }
      throw new Error(messageAvatar)
    }
    return content
  } catch (error) {
    throw error
  }
}

export default addClient