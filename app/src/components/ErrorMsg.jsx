import React from 'react';

const ErrorMsg = (props) => {
  const errors = props.errors || [];
  const Errors = errors.map( (error, i) => {
    return (<li key = {i}><span style = {{color: 'red'}}>{error}</span></li>);
  });
  //on component will unmount set errors to null
  return (
    <div style = {{display: (errors.length ? 'block' : 'none')}}>
      <ul>
        {Errors}
      </ul>
    </div>
  );
};

export default ErrorMsg;
