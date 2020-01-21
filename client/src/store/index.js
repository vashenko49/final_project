import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as Authorization from '../actions/authorizationAction';
import * as Configuration from '../actions/configurationAction';

export function configureStore(initState) {
  let store = createStore(reducers, {}, applyMiddleware(thunk));
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(logger, thunk)));
  }
  store.dispatch(Configuration.getConfigForSystem());
  store.dispatch(
    Authorization.AuthorizationThroughLocalStorage(localStorage.getItem('Authorization'))
  );

  return store;
}
