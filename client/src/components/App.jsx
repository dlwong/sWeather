import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Password from './Password.jsx';
import Recommendation from './Recommendation.jsx';
import history from './history'

export default function App() {
    return (
      <Router history={history}>
        <Route exact path = '/' component = { Home } />
        <Route path = '/login' component = { Login } />
        <Route path = '/signup' component = { Signup } />
        <Route path = '/password' component = { Password } />
        <Route path = '/recommendation' component = { Recommendation} />
      </Router>
      );
};

