import React from 'react'
import {Switch, Route} from 'react-router-dom';
import NotFound from './NotFound';
import Home from './Home';
import Lead from './Lead';
import Dashboard from './Dashboard';
import VendasDash from './VendasDash';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/lead/:id" component={Lead}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/vendas" component={VendasDash}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    );
}

export default Routes;
