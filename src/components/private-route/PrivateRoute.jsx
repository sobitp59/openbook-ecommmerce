import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({isLogin, children}) => {
    const location = useLocation()
    console.log(location)


  return isLogin ? children : <Navigate to={'/login'} state={{from : location}} />
}

export default PrivateRoute