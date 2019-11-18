import React from 'react';
import { BwserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Login from './components/auth/Login';
import Registration from './components/auth/Registration';

import PrivateRoute from './components/routing/PrivateRoute';

import './App.scss';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/subscribe">Subscribe</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Registration} />
          <PrivateRoute exact path="/subscribe" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
