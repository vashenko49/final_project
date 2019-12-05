import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import authorization from './authorization';
import product from './product';

export default combineReducers({
  adminProducts,
  authorization,
  product
});
