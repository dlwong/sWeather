import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import Recommendation from './Recommendation.jsx';
import ResetPassword from './ResetPassword.jsx';
import history from './history'

export default function App() {
    return (
      <Router history={history}>
        <Route exact path = '/' component = { Home } />
        <Route path = '/login' component = { Login } />
        <Route path = '/signup' component = { Signup } />
        <Route path = '/forgotpassword' component = { ForgotPassword } />
        <Route path = '/recommendation' component = { Recommendation} />
        <Route path = '/resetpassword/:token' component = { ResetPassword } />
      </Router>
      );
};

