import React from 'react'
import { Switch, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Home from './Home';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default Routes;
