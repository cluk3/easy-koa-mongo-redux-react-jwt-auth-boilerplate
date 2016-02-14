import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistory, routeReducer } from 'react-router-redux';
import history from './history';

const loggerMiddleware = createLogger();
const rootReducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));
export const reduxRouterMiddleware = syncHistory(history);

export function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      reduxRouterMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
  );
}
