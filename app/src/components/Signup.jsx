import React from 'react';
import Form from './Form';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import ErrorMsg from './ErrorMsg';

const Signup = React.createClass({

  getInitialState() {
    return {
      username: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      },
      disabled: true,
    };
  },

  getErrorMsg(input, value) {
    switch(input) {
      case 'username':
        if(value.length === 0)
          return 'This field is required';
        if(value.length < 4)
          return 'Username must be at least 4 characters long';
        if(!(/^[A-Za-z0-9]+$/.test(value)))
          return 'Username can contain only letters and numbers';
        break;
      case 'password':
        if(value.length === 0)
          return 'This field is required';
        if(value.length < 4)
          return 'Password must be at least 4 characters long';
        break;
      default:
        return '';
    }
    return '';
  },

  onInputChange(e) {
    const error = this.getErrorMsg(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: {
        value: e.target.value,
        error
      }
    });
  },

  render() {
    return (
      <Row style = {{height: '60vh'}} center='xs' middle = 'xs'>
        <Col xs = {6}>
          <h1>Sign up</h1>
          {this.props.isAuthenticated ?
            <Row center='xs' middle = 'xs'>
              <Col xs = {3}>
                <ErrorMsg errors = {['You already have an account']}/>
              </Col>
            </Row>
          :
            <Form  { ...this.state}
            onSubmit = {this.props.onSubmit}
            onInputChange = {this.onInputChange}
            />
          }
        </Col>
      </Row>
    );
  }

});

export default Signup;
