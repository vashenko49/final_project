import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

export function configureStore(initState) {
  const logger = createLogger();
  const store = createStore(rootReducer, initState, applyMiddleware(logger, thunk));

  return store;
}
