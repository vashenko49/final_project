import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from './store';
import AdminPanel from './components/admin-panel/AdminPanel';
import FooterLinkPage from './components/FooterLinkPage/FooterLinkPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import ProductPageF from './components/page/ProductPageF';
import Cart from './components/cart/Cart';
import MainPage from './components/page/MainPage';
import HeaderSearchProductPage from './components/HeaderSearchProductPage/HeaderSearchProductPage';
import Authorization from './components/Authorization/Authorization';
import PasswordRecovery from './components/Authorization/PasswordRecovery/PasswordRecovery';
import CatalogPage from './components/page/CatalogPage/CatalogPage';
import Checkout from './components/Checkout/Checkout';

import './font/Varta/Varta-font.css';
import './font/Proxima_Nova/Proxima_Nova-font.css';
import './font/Roboto/Roboto-font.css';

import './App.scss';
import PersonalData from './components/PersonalData/PersonalData';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/authorization" component={Authorization} />
            <Route exact path="/links/content/:customId" component={FooterLinkPage} />
            <Route exact path="/admin-panel*" component={AdminPanel} />
            <Route exact exect path="/" component={MainPage} />
            <Route exact exect path="/product/:id" component={ProductPageF} />
            <Route exact exect path="/catalog/:id" component={CatalogPage} />
            <Route exact exect path="/products/search" component={HeaderSearchProductPage} />
            <Route exact exect path="/cart/:id" component={Cart} />
            <Route exact exect path="/passwordrecovery/:token" component={PasswordRecovery} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/personaldata" component={PersonalData} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
