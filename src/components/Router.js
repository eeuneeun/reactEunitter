import React, { useState } from 'react';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Profile from '../routes/MyProfile';
import Nav from './Nav';

const AppRouter = ({isLogin, userObj}) => {
return (
    <HashRouter>
        {isLogin && <Nav />}
        <Switch>
            {isLogin ? (
            <>
            <Route exact path="/">
                <Home userObj={userObj}/>
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route> 
            </>
            ):(
            <>
            <Route exact path="/">
                <Auth />
            </Route> 
            <Redirect from="*" to="/" />
            </>
            )}
        </Switch>
    </HashRouter>
    )
};


export default AppRouter;