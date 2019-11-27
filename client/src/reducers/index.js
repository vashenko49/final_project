import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import product from './product';

export default combineReducers({
  adminProducts,
  product
});
