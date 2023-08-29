import React, { createContext, useEffect, useReducer, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from '../../pages/register/Register'
import Login from '../../pages/login/Login'
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import Home from '../../pages/home/Home';
import { initialUser, userReducer } from '../../services/usersReducer';
import { getSession } from '../../services/sessionService';
import Profile from '../../pages/profile/Profile';
import Layout from '../layout/Layout';
import DetailPost from '../../pages/detailPost/DetailPost';
import NewPost from '../../pages/newPost/NewPost';

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

    const [userLogin, userDispatch] = useReducer(userReducer, initialUser);
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const globalState = {user: {
        userLogin,
        userDispatch,
        
    }, userData: null, posts, setPosts, friends, setFriends}

  return (
    <AppContext.Provider value={globalState}>
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route element={<PublicRouter isAutenticated={userLogin.isAutenticated}/>}>
                    <Route path='register' element={<Register/>}/>
                    <Route index path='login' element={<Login/>}/>
                </Route>
                
                <Route element={<PrivateRouter isAutenticated={userLogin.isAutenticated}/>}>

                        <Route index path='/' element={<Home/>}/>
                        <Route path='/profile/:idProfile' element={<Profile/>}/>
                        <Route path='/post/:idPost' element={<DetailPost/>}/>
                        <Route path='/NewPost' element={<NewPost/>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  )
}

export default Router;