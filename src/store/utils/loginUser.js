import { apiFetch } from '../service/api'
import { setAdmin , setToken } from '../service/manageLocalStorage'

const loginUser = async admin => {
  const respond = {
    admin: null,
    error: null
  }
  try {
    const { success , content , message } = await apiFetch('/auth/sign-in-admin',admin,'POST')
    if(success){
      setAdmin(content)
      setToken(content.token)
      respond.admin = content
      return respond
    }
    respond.error = message
    return respond
  } catch (error) {
    respond.error = error.message
    return respond
  }
}

export default loginUser