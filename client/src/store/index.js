import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore(initState) {
  const logger = createLogger();
  const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(logger, thunk)));

  return store;
}

// const initialState = {};

// const store = createStore(
//   reducers,
//   initialState,
//   composeWithDevTools(applyMiddleware(thunk))
// )

// export default store;
