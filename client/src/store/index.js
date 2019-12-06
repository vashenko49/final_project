import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as Authorization from "../actions/authorizationAction";

export function configureStore(initState) {
  const logger = createLogger();
  const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(logger, thunk)));

  const token = localStorage.getItem('Authorization');
  if (token) {
    store.dispatch(Authorization.firstStart(token));
  }

  return store;
}
