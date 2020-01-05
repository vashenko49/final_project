import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as Authorization from '../actions/authorizationAction';
import * as Configuration from '../actions/configurationAction';
import * as Cart from '../actions/cart';

export function configureStore(initState) {
  const logger = createLogger();
  const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(logger, thunk)));
  store.dispatch(Configuration.getConfigForSystem());

  const token = localStorage.getItem('Authorization');
  if (token) {
    store.dispatch(Authorization.AuthorizationThroughLocalStorage(token));
    store.dispatch(Cart.getCurrentItemsUsingToken(token));
  }

  return store;
}
