import React from 'react'
import {Switch, Route} from 'react-router-dom';
import NotFound from './NotFound';
import Home from './Home';
import Lead from './Lead';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={Home}/>
            <Route path="/lead/:id" component={Lead}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    );
}

export default Routes;
