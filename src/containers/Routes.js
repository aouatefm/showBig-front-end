import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound/NotFound';
import Register from "./Register/Register";
import SellPage from "./SellPage/SellPage";

const Routes = (props) => (
    <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/register">
            <Register />
        </Route>
        <Route exact path="/sell-now">
            <SellPage />
        </Route>
        <Route>
            <NotFound/>
        </Route>
    </Switch>
);

export default Routes;