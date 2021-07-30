// library
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// local
import store from '../../config/redux';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Register from '../pages/register';
// style
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
