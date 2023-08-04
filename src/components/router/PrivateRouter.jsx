import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = ({isAutenticated}) => {
  return (
    <div>{
        isAutenticated ? <Outlet/>: <Navigate to={"login"}/> 
    }</div>
  )
}

export default PrivateRouter