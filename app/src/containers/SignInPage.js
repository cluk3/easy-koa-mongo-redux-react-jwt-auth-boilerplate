import { connect } from 'react-redux';
import { fetchSignin } from '../actions/signin';
import Signin from '../components/Signin';


const mapStateToProps = (state, ownProps) => {
  const auth = state.auth;
  return {
    isFetching: auth.isFetching,
    isAuthenticated: auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (credentials) => {
      dispatch(fetchSignin(credentials));
    },
  };
};

const SignUpPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);

export default SignUpPage;
