import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import footerLinks from './footerLinks';
import footerSubscribe from './footerSubscribe';
import product from './product';

export default combineReducers({
  adminProducts,
  footerLinks,
  footerSubscribe,
  product
});
