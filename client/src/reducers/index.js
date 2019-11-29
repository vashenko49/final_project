import { combineReducers } from 'redux';

import adminProducts from './adminProducts';
import adminBrands from './adminBrands';
import adminFilters from './adminFilters';

export default combineReducers({
  adminProducts,
  adminBrands,
  adminFilters
});
