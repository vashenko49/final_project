import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import adminBrands from './adminBrands';

export default combineReducers({
  adminProducts,
  adminBrands
});
