import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AdminPanel from '../admin-panel/AdminPanel';
import FooterLinkPage from '../FooterLinkPage/FooterLinkPage';

import ProductPageF from '../page/ProductPageF';
import Cart from '../cart/Cart';
import MainPage from '../page/MainPage';
import HeaderSearchProductPage from '../HeaderSearchProductPage/HeaderSearchProductPage';
import NotFound from '../page/NotFound';

import Authorization from '../Authorization/Authorization';
import PasswordRecovery from '../Authorization/PasswordRecovery/PasswordRecovery';
import CatalogPage from '../page/CatalogPage/CatalogPage';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/authorization" component={Authorization} />
        <Route exact path="/links/content/:customId" component={FooterLinkPage} />
        <Route exact path="/admin-panel*" component={AdminPanel} />
        <Route exact exect path="/" component={MainPage} />
        <Route exact exect path="/product/:id" component={ProductPageF} />
        <Route exact exect path="/catalog/:id" component={CatalogPage} />
        <Route exact exect path="/products/search" component={HeaderSearchProductPage} />
        <Route exact exect path="/cart" component={Cart} />
        <Route exact exect path="/passwordrecovery/:token" component={PasswordRecovery} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
