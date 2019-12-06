import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import authorization from './authorization';
import footerLinks from './footerLinks';
import footerSubscribe from './footerSubscribe';
import adminBrands from './adminBrands';
import adminFilters from './adminFilters';
import product from './product';

export default combineReducers({
  adminProducts,
  authorization,
  footerLinks,
  footerSubscribe,
  adminBrands,
  adminFilters,
  product
});
