import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import ProductPageF from './components/page/ProductPageF';
import PrivateRoute from './components/routing/PrivateRoute';
import PasswordRecovery from './components/Authorization/PasswordRecovery/PasswordRecovery';

import './font/Varta/Varta-font.css';
import './font/Proxima_Nova/Proxima_Nova-font.css';
import './font/Roboto/Roboto-font.css';


import './App.scss';
import setAuthToken from './utils/setAuthToken';
import Authorization from './components/Authorization/Authorization';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

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
            <Route exact path="/authorization" component={Authorization} />
            <Route exact exect path="/product/:id" component={ProductPageF} />
            <Route exact path="/passwordrecovery/:token" component={PasswordRecovery} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
