import React , { useEffect , useContext } from 'react'
import AppContext from '../store/App/AppContext'
import swal from 'sweetalert2'
import verifySession from '../store/utils/verifySession'

const Observer = ({children}) => {
  const { error , setError , setAdmin } = useContext(AppContext)

  useEffect(async () => {
    if(error){
      await swal.fire({
        title: 'Error',
        icon: 'error',
        text: error
      })
      setError(null)
    }
  }, [error])

  useEffect(async () => {
    const respond = await verifySession()
    if(respond.error){
      if(typeof respond.error === 'string'){
        setError(respond.error)
      }
      setAdmin(null)
    }else{
      setAdmin(respond.admin)
    }
  },[])

  return <>{children}</>
}

export default Observer