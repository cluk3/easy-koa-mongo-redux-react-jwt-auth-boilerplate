import fetch from 'isomorphic-fetch';
import { routeActions } from 'react-router-redux';
import { openSnackbar } from './snackbar';
import { setErr } from './errors';
const HOME_PAGE = '/';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

function signupRequest() {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false
  };
}

function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  };
}

function signupFailure() {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
  };
}

export function fetchSignup(credentials) {

  return function(dispatch) {

    dispatch(signupRequest());

    const actionLink = 'http://localhost:3000/signup';
    const fetchOpts =  {
      credentials: 'include',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    };

    return fetch(actionLink, fetchOpts)
      .catch( (error) => {
        dispatch(signupFailure());
        dispatch(setErr(error.message));
      })
      .then( (res) => res.ok ? res.json() : Promise.reject(res) )
      .then(
        (json) => {
          const user = {
            name: json.data.attributes.username,
            id: json.data.id
          };
          localStorage.setItem('username', user.name);
          localStorage.setItem('user_id', user.id);
          localStorage.setItem('jwt', json.data.jwt);
          dispatch(signupSuccess(user));
          dispatch(routeActions.push(HOME_PAGE));
          dispatch(openSnackbar(`Welcome ${user.name}!`));
          return Promise.resolve();
        })
      .catch(
        (res) => {
          if(res.status > 499) {
            dispatch(signupFailure('Server error'));
            dispatch(setErr('Server error.'));
            dispatch(routeActions.push('/500'));
          }
          if(res.status > 399 && res.status < 500) {
            res.json().then(
              (json) => {
                dispatch(signupFailure());
                dispatch(setErr(json.errors));
              }
            );
          }
        }
      );
  };
}
