import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';

import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Bag from './components/cart/Bag'
import Item from './components/cart/Item'
import Row from './components/row/Row'

import ProductPage from "./components/page/ProductPage";

import PrivateRoute from './components/routing/PrivateRoute';

import './App.scss';
import PasswordRecovery from './components/auth/PasswordRecovery';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/subscribe">Subscribe</Link>
              </li>
            </ul>
          </nav> */}

          {/* <Row left={<Bag/>} right={<Item/>}/> */}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/" component={ProductPage} />
            <Route exact path="/passwordrecovery/:token" component={PasswordRecovery} />
            <PrivateRoute exact path="/subscribe" component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
