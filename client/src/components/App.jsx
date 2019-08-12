import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export default function App() {
    return (
      <Switch>
        <Route exact path = '/' component = { Home } />
        <Route path = '/login' component = { Login } />
        <Route path = '/signup' component = { Signup } />
      </Switch>
      );
};

