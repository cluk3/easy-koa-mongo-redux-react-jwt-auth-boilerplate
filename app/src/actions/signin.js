import fetch from 'isomorphic-fetch';
import { routeActions } from 'react-router-redux';
import { openSnackbar } from './snackbar';
import { setErr } from './errors';
const HOME_PAGE = '/';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

// credentials = {username, password}
function signinRequest() {
  return {
    type: SIGNIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  };
}

function signinSuccess(user) {

  return {
    type: SIGNIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  };
}

function signinFailure() {
  return {
    type: SIGNIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
  };
}

export function fetchSignin(credentials) {

  return function(dispatch) {

    dispatch(signinRequest());

    const actionLink = 'http://localhost:3000/signin';
    const fetchOpts =  {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    };

    return fetch(actionLink, fetchOpts)
    .catch( (error) => {
      dispatch(signinFailure());
      dispatch(setErr(error.message));
    })
    .then(
      (res) => {
        if(res.ok)
          return res.json();
        else
          return Promise.reject(res);
    })
    .then(
      (json) => {
        const user = {
          name: json.data.attributes.username,
          id: json.data.id
        };
        localStorage.setItem('username', user.name);
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('jwt', json.data.jwt);
        dispatch(signinSuccess(user));
        dispatch(routeActions.push(HOME_PAGE));
        dispatch(openSnackbar('Successfully Log In'));
        return Promise.resolve();
      })
      .catch(
      (res) => {
        console.log(res);
        if(res.status === 304) {
          dispatch(signinFailure());
          dispatch(setErr('You are already logged in'));
        }
        if(res.status > 499) {
          dispatch(signinFailure());
          dispatch(setErr('Server error.'));
          dispatch(routeActions.push('/500'));
        }
        if(res.status > 399 && res.status < 500) {
          res.json().then(
            (json) => {
              dispatch(signinFailure());
              dispatch(setErr(json.errors));
            }
          );
        }
      }
    );

  };
}
