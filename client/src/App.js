import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from './store';

import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import AdminPanel from './components/admin-panel/AdminPanel';

import PrivateRoute from './components/routing/PrivateRoute';

import './App.scss';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/subscribe">Subscribe</Link>
              </li>
              <li>
                <Link to="/admin-panel">Admin Panel</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/" component={Registration} />
            <Route path="/admin-panel" component={AdminPanel} />
            <PrivateRoute exact path="/subscribe" component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
