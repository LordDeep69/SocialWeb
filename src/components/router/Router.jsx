import React, { createContext, useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from '../../pages/register/Register'
import Login from '../../pages/login/Login'
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import Home from '../../pages/home/Home';
import { initialUser, userReducer } from '../../services/usersReducer';
import { getSession } from '../../services/sessionService';
import Profile from '../../pages/profile/Profile';

export const AppContext = createContext({});

const Router = () => {

    useEffect(() => {
        const user = getSession()
        if (user?.name) {
            userDispatch({
            type: "login",
            payload: {
                isAutenticated: true,
                user: user
            }})
        }
    }, [])

    const [userLogin, userDispatch] = useReducer(userReducer, initialUser)
    const globalState = {user: {
        userLogin,
        userDispatch
    }}

  return (
    <AppContext.Provider value={globalState}>
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route element={<PublicRouter isAutenticated={userLogin.isAutenticated}/>}>
                    <Route path='register' element={<Register/>}/>
                    <Route path='login' element={<Login/>}/>
                </Route>

                <Route element={<PrivateRouter isAutenticated={userLogin.isAutenticated}/>}>
                    <Route path='/' element={<Home/>}/>
                        {/* <Route index element={<Home/>}/> */}
                        <Route path='profile' element={<Profile/>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  )
}

export default Router