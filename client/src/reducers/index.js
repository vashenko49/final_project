import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import footerLinks from './footerLinks';

export default combineReducers({
  adminProducts,
  footerLinks
});
