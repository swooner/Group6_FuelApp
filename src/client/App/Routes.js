
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';

const Routes = ( props ) => {
    return (
        <Switch>
            <Route exact path='/' render={ ( ) => {
                return (
                    <HomePage
                        { ...props } />
                )
            }} />
        </Switch>
    )
};

export default Routes;