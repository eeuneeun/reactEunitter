import React, { useState } from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import Home from '../routes/Home';
import Auth from '../routes/Auth';

const AppRouter = ({isLogin}) => {
return (
    <HashRouter>
        <Switch>
            {isLogin ? (
            <>
            <Route exact path="/">
                <Home />
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