import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from './store';
import AdminPanel from './components/admin-panel/AdminPanel';
import FooterLinkPage from './components/FooterLinkPage/FooterLinkPage';
import Footer from './components/Footer/Footer';

import ProductPageF from './components/page/ProductPageF';
import Cart from './components/cart/Cart';
import Carousel from './components/page/Carousel';
import MainPage from './components/page/MainPage';

import './font/Varta/Varta-font.css';
import './font/Proxima_Nova/Proxima_Nova-font.css';
import './font/Roboto/Roboto-font.css';

import './App.scss';
import Authorization from './components/Authorization/Authorization';
import PasswordRecovery from './components/Authorization/PasswordRecovery/PasswordRecovery';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          {/* <li>
            <Link to="/admin-panel">Admin Panel</Link>
          </li> */}
          <Switch>
            <Route exact path="/authorization" component={Authorization} />
            <Route exact path="/links/content/:customId" component={FooterLinkPage} />
            <Route exact path="/admin-panel*" component={AdminPanel} />
            <Route exact exect path="/main-page" component={MainPage} />
            <Route exact exect path="/cart/:id" component={Cart} />
            <Route exact exect path="/c" component={Carousel} />
            <Route exact exect path="/product/:id" component={ProductPageF} />
            <Route exact exect path="/passwordrecovery/:token" component={PasswordRecovery} />
          </Switch>
          {/* <Footer /> */}
        </Router>
      </Provider>
    );
  }
}

export default App;
