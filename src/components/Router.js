import React, { useState } from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Profile from '../routes/MyProfile';
import Nav from './Nav';

const AppRouter = ({isLogin}) => {
return (
    <HashRouter>
        {isLogin && <Nav />}
        <Switch>
            {isLogin ? (
            <>
            <Route exact path="/">
                <Home />
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
            </>
            )}
        </Switch>
    </HashRouter>
    )
};


export default AppRouter;