import {
  LOGOUT_SUCCESS
} from '../actions/logout';
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE
} from '../actions/signin';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../actions/signup';

import {
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from '../actions/snackbar';

import {
  SET_ERR,
  CLEAR_ERR
} from '../actions/errors';

function errors(state = [], action) {
  switch(action.type) {
    case SET_ERR:
      return action.errors;
    case CLEAR_ERR:
      return [];
    default:
      return state;
  }
}

function auth(state = {
  isFetching: false,
  isAuthenticated: false,
  }, action) {
  const {isFetching, isAuthenticated, type, user} = action;
  switch (type) {
  case SIGNUP_REQUEST:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated
    });
  case SIGNUP_SUCCESS:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated,
      user
    });
  case SIGNUP_FAILURE:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated,
    });
  case SIGNIN_REQUEST:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated
    });
  case SIGNIN_SUCCESS:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated,
      user
    });
  case SIGNIN_FAILURE:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated,
    });
  case LOGOUT_SUCCESS:
    return {
      isAuthenticated
    };
  default:
    return state;
  }
}

function snackbar(state = { isOpen: false, message: '' }, action) {
  switch(action.type) {
    case OPEN_SNACKBAR:
      return {
        isOpen: true,
        message: action.message
      };
    case CLOSE_SNACKBAR:
      return {
        isOpen: false,
        message: ''
      };
    default:
      return state;
  }
}

export default {
  errors,
  snackbar,
  auth
};
