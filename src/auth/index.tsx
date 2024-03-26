import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const RequireAuth = () => {
    const { token } = useAppContext()
    const location = useLocation()
  return (
    token?.user 
      ? <Outlet />
      : <Navigate to='/login' state={{from: location}} replace />
  )
}

export default RequireAuth