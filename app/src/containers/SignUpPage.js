import { connect } from 'react-redux';
import { fetchSignup } from '../actions/signup';
import Signup from '../components/Signup';

const mapStateToProps = (state, ownProps) => {
  const auth = state.auth;
  return {
    isFetching: auth.isFetching,
    isAuthenticated: auth.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (credentials) => {
      dispatch(fetchSignup(credentials));
    }
  };
};

const SignUpPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

export default SignUpPage;
