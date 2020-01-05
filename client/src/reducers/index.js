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
import comments from './comments';
import slides from './slides';
import header from './header';
import headerSearch from './headerSearch';
import partner from './partner';
import configuration from './configuration';
import checkout from './checkout';

export default combineReducers({
  adminProducts,
  product,
  cart,
  comments,
  authorization,
  footerLinks,
  footerLinksId,
  footerSubscribe,
  adminBrands,
  adminFilters,
  header,
  headerSearch,
  configuration,
  partner,
  slides,
  checkout
});
