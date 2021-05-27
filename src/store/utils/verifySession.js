import { apiFetchAuth } from '../service/api'
import { getAdmin , setToken , setAdmin } from '../service/manageLocalStorage'

const verifySession = async () => {
  const respond = {
    admin: null,
    error: null,
  }
  try {
    const admin = getAdmin()
    if(!admin){
      setAdmin(null)
      setToken('')
      respond.error = true
      return respond
    }
    const { _id } = admin
    if(!_id){
      setAdmin(null)
      setToken('')
      respond.error = true
      return respond
    }
    const url = `/clients/getById/${_id}`
    const { success , content } = await apiFetchAuth(url)
    if(!success){
      setAdmin(null)
      setToken('')
      respond.error = true
      return respond
    }
    respond.admin = content
    return respond
  } catch (error) {
    console.log(error)
    respond.error = error.message
    return respond
  }
}

export default verifySession