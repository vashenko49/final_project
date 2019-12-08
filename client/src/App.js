import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';

// import Login from './components/auth/Login';

// import PrivateRoute from './components/routing/PrivateRoute';

import Cart from './components/cart/Cart';
import Page from './components/page/ProductPageF'

import './App.scss';
// import PasswordRecovery from './components/auth/PasswordRecovery';

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

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/product/:id" component={Page} />
            {/* <Route exact exect path="/product/:id" component={ProductPageF} /> */}
            {/* <Route exact path="/passwordrecovery/:token" component={PasswordRecovery} /> */}
            {/* <PrivateRoute exact path="/subscribe" component={Login} /> */}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
