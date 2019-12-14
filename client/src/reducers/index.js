import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import authorization from './authorization';
import footerLinks from './footerLinks';
import footerLinksId from './footerLinksId';
import footerSubscribe from './footerSubscribe';
import adminBrands from './adminBrands';
import adminFilters from './adminFilters';
import product from './product';
<<<<<<< HEAD
import cart from './cart';
=======
import header from './header';
import configuration from './configuration';
>>>>>>> develop

export default combineReducers({
  adminProducts,
  product,
  cart,
  authorization,
  footerLinks,
  footerLinksId,
  footerSubscribe,
  adminBrands,
<<<<<<< HEAD
  adminFilters
=======
  adminFilters,
  product,
  header,
  configuration
>>>>>>> develop
});
