import { connect } from 'react-redux';
import { logout } from '../actions/logout';
import App from '../components/App';
import { routeActions } from 'react-router-redux';
import { clearErr } from '../actions/errors';
import { closeSnackbar } from '../actions/snackbar';

const mapStateToProps = (state, ownProps) => {
  const auth = state.auth;
  return {
    isSnackbarOpen: state.snackbar.isOpen,
    message: state.snackbar.message,
    isFetching: auth.isFetching,
    isAuthenticated: auth.isAuthenticated,
    errors: state.errors,
    user: auth.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogoutClick: () => {
      dispatch(logout('Successfully Log Out'));
    },
    linkTo: (url) => {
      dispatch(routeActions.push(url));
    },
    clearErr: () => dispatch(clearErr()),
    closeSnackbar: () => dispatch(closeSnackbar())
  };
};

const Application = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default Application;
