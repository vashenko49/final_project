import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminPanel from '../admin-panel/AdminPanel';
import FooterLinkPage from '../FooterLinkPage/FooterLinkPage';

import Cart from '../cart/Cart';
import MainPage from '../MainPage/MainPage';
import HeaderSearchProductPage from '../HeaderSearchProductPage/HeaderSearchProductPage';
import NotFound from '../NotFound/NotFound';

import Authorization from '../Authorization/Authorization';
import PasswordRecovery from '../Authorization/PasswordRecovery/PasswordRecovery';
import CatalogPage from '../CatalogPage/CatalogPage';
import Checkout from '../Checkout/Checkout';
import PersonalProfile from '../PersonalData/PersonalData';
import Order from '../Order/Order';
import PrivateRoute from './PrivateRoute';
import AuthorizationPage from '../Authorization/AuthorizationPage/AuthorizationPage';
import ProductPage from '../ProductPage/ProductPage';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/authorization*" component={AuthorizationPage} />
        <PrivateRoute exact path="/admin-panel*" component={AdminPanel} />
        <Route exact path="/authorization" component={Authorization} />
        <Route exact path="/links/content/:customId" component={FooterLinkPage} />
        <Route exact path="/" component={MainPage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/catalog/:id" component={CatalogPage} />
        <Route exact path="/products/search" component={HeaderSearchProductPage} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/passwordrecovery/:token" component={PasswordRecovery} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/personaldata" component={PersonalProfile} />
        <Route exact path="/order/:id" component={Order} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
