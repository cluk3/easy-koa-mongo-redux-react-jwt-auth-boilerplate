import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import fetch from 'isomorphic-fetch';
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { openSnackbar } from '../actions/snackbar';
import { setErr } from '../actions/errors';
import { logout } from '../actions/logout';
const HOME_PAGE = '/';


const ChangePassword = React.createClass({

  getInitialState() {
    return {
      oldPassword: '',
      newPassword: '',
      pswConfirm: {
        value: '',
        error: ''
      },
      isFetching: false
    };
  },

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  },

  onConfirmChange(e) {
    const error = e.target.value !== this.state.newPassword ?
      'Password does not match' : '';
    this.setState({
      pswConfirm: {
        value: e.target.value,
        error
      }
    });
  },

  updatePassword(passwords) {

    const dispatch = this.props.dispatch;

    this.setState({
      isFetching: true,
    });
    const actionLink = 'http://localhost:3000/change-password';
    const fetchOpts =  {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify(passwords)
    };

    const redirect = (link)  => dispatch(routeActions.push(link));
    const openError = (error) => dispatch(setErr(error));

    fetch(actionLink, fetchOpts)
      .then( (res) => {
        if(!res) return openError('Connection refused');
        if(res.ok) {
          this.setState({ isFetching: false });
          redirect(HOME_PAGE);
          dispatch(openSnackbar('Password changed successfully!'));
          return Promise.resolve();
        } else {
          return Promise.reject(res);
        }
      })
      .catch(
        (res) => {
          if(res.status > 499) {
            redirect('/500');
          }
          if(res.status === 422) {
            res.json().then(
              (json) => {
                openError(json.errors);
              }
            );
          }
          if(res.status === 401) {
            localStorage.clear();
            redirect('/signin');
            dispatch(logout('Your session expired.'));
          }
          else {
            openError('Bad request');
          }
          this.setState({ isFetching: false });
        }
      );
  },

  isDisabled() {
    const { oldPassword, newPassword, pswConfirm } = this.state;
    return !(oldPassword && newPassword && pswConfirm.value && !pswConfirm.error);
  },

  render() {
    const {oldPassword, newPassword, pswConfirm} = this.state;
    return (
      <Row style = {{height: '60vh'}} center='xs' middle = 'xs'>
        <Col xs = {6}>
          <h1>Change Password</h1>
            <form onSubmit = {
              (e) => {
                e.preventDefault();
                this.updatePassword({
                  oldPassword,
                  newPassword
                });
              }
            }>
              <TextField
                hintText = 'Insert password'
                floatingLabelText = 'Old Password'
                type='password'
                value = {oldPassword}
                onChange = {this.onInputChange}
                name = 'oldPassword' />
              <br />
              <TextField
                hintText = 'Insert new password'
                floatingLabelText = 'New Password'
                type='password'
                value = {newPassword}
                onChange = {this.onInputChange}
                name = 'newPassword' />
              <br />
              <TextField
                hintText = 'Confirm new password'
                floatingLabelText = 'Confirm Password'
                type = 'password'
                value = {pswConfirm.value}
                onChange = {this.onConfirmChange}
                name = 'password'
                errorText = {pswConfirm.error}>
              </TextField>
              <br />
              <RaisedButton
                type='submit'
                label = 'Submit'
                disabled = {this.isDisabled()}
                labelPosition = 'before'
                icon = {<ContentSend />} />
            </form>
          </Col>
        </Row>
    );
  }
});

export default connect()(ChangePassword);
