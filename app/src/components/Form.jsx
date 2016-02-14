import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentSend from 'material-ui/lib/svg-icons/content/send';

const Form = (props) => {
  const {username, password, onInputChange, onSubmit} = props;

  return (
    <form onSubmit = {
      (e) => {
        e.preventDefault();
        onSubmit({
          username: username.value,
          password: password.value
        });
      }
    }>
      <TextField
        hintText = ' Insert Username'
        floatingLabelText = 'Username'
        type="text"
        value = {username.value}
        onChange = {onInputChange}
        name = 'username'
        errorText = {username.error}>
      </TextField>
      <br />
      <TextField
        hintText = ' Insert Password'
        floatingLabelText = 'Password'
        type = 'password'
        value = {password.value}
        onChange = {onInputChange}
        name = 'password'
        errorText = {password.error}>
      </TextField>
      <br />
      <RaisedButton
        type="submit"
        label = 'Submit'
        disabled = {!!(username.error || password.error || !username.value.length || !password.value.length)}
        // i know it's a code smell, have to figure out how to change it
        labelPosition = 'before'
        icon = {<ContentSend />} />
    </form>
  );
};

export default Form;
