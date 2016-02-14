import { routeActions } from 'react-router-redux';
import { openSnackbar } from './snackbar';
import { setErr } from './errors';
const HOME_PAGE = '/';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';


function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    isAuthenticated: false,
  };
}

export function logout(message) {

  return function(dispatch) {
    try {
      localStorage.clear();
      dispatch(logoutSuccess());
      dispatch(routeActions.push(HOME_PAGE));
      dispatch(openSnackbar(message));
    } catch(err) {
      dispatch(setErr('Something went wrong.'));
    }
  };
}
