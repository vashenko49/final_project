import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import product from './product';
import cart from './cart';

export default combineReducers({
  adminProducts,
  product,
  cart
});
