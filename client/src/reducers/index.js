import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import authorization from './authorization';
import footerLinks from './footerLinks';
import footerLinksId from './footerLinksId';
import footerSubscribe from './footerSubscribe';
import adminBrands from './adminBrands';
import adminFilters from './adminFilters';
import product from './product';
import cart from './cart';

export default combineReducers({
  adminProducts,
  product,
  cart,
  authorization,
  footerLinks,
  footerLinksId,
  footerSubscribe,
  adminBrands,
  adminFilters
});
