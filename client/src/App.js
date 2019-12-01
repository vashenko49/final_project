import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from './store';

import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import AdminPanel from './components/admin-panel/AdminPanel';
import FooterLinkPage from './components/FooterLinkPage/FooterLinkPage';
import Footer from './components/Footer/Footer';

import ProductPageF from './components/page/ProductPageF';

import PrivateRoute from './components/routing/PrivateRoute';

import './App.scss';
import PasswordRecovery from './components/auth/PasswordRecovery';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          {/*<nav>*/}
            {/*<ul>*/}
              {/*<li>*/}
                {/*<Link to="/subscribe">Subscribe</Link>*/}
              {/*</li>*/}
              {/*<li>*/}
                {/*<Link to="/admin-panel">Admin Panel</Link>*/}
              {/*</li>*/}
            {/*</ul>*/}
          {/*</nav>*/}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/pages/:customId" component={FooterLinkPage} />
            <Route exact path="/admin-panel*" component={AdminPanel} />
            <Route exact path="/login" component={Login} />
            <Route exact exect path="/product/:id" component={ProductPageF} />
            <Route exact path="/passwordrecovery/:token" component={PasswordRecovery} />
            <PrivateRoute exact path="/subscribe" component={Login} />
          </Switch>
          <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
