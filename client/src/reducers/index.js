import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import authorization from './authorization';
import footerLinks from './footerLinks';
import footerLinksId from './footerLinksId';
import footerSubscribe from './footerSubscribe';
import adminBrands from './adminBrands';
import adminFilters from './adminFilters';
import product from './product';

export default combineReducers({
  adminProducts,
  authorization,
  footerLinks,
  footerLinksId,
  footerSubscribe,
  adminBrands,
  adminFilters,
  product
});
