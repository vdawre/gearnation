import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../context/dataContext'

const Auth = ({children}) => {
    const location = useLocation()

    const { state } = useGlobalContext()

  return state.isLoggedIn ? children : <Navigate to="/login" state={{ from: location}} />
}

export default Auth