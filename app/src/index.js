import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import history from './history';
import Application from './containers/Application';
import SignInPage from './containers/SignInPage';
import SignUpPage from './containers/SignUpPage';
import ChangePassword from './components/ChangePassword';
import NotFound from './components/NotFound';
import ServerError from './components/ServerError';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { reduxRouterMiddleware, configureStore } from './configureStore';

function main() {
  injectTapEventPlugin(); // for enhanced Material UI performance
  const app = document.createElement('div');

  document.body.appendChild(app);

  const initialState = {};

  const user = {
    id: localStorage.getItem('user_id'),
    name: localStorage.getItem('username')
  };

  if(localStorage.getItem('jwt')) {
    initialState.auth = {
      user,
      isAuthenticated: true,
      errors: []
    };
  }

  const store = configureStore(initialState);

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  ReactDOM.render((
    <Provider store = {store}>
      <Router history = {history}>
        <Route path="/" component={Application}>
          <Route path="signin" component={SignInPage} />
          <Route path="signup" component={SignUpPage} />
          <Route path="404" component={NotFound} />
          <Route path="500" component={ServerError} />
          <Route path="change-password" component={ChangePassword} />
        </Route>
      </Router>
    </Provider>
  ), app);
}

main();
