import { setAdmin , setToken } from '../service/manageLocalStorage'

const logoutUser = () => {
  setToken('')
  setAdmin(null)
}

export default logoutUser