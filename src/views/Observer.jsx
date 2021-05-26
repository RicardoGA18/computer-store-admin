import React , { useEffect , useContext } from 'react'
import AppContext from '../store/App/AppContext'
import swal from 'sweetalert2'

const Observer = ({children}) => {
  const { error , setError } = useContext(AppContext)

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

  return <>{children}</>
}

export default Observer