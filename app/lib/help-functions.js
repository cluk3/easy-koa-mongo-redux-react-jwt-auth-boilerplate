
export function validator(regExp, value, errorString, required) {
  if(required && !value.length)
    return 'This input field is required';
  if(!(regExp.test(value)))
      return errorString;
  return '';
}

export function authorizedFetch(url, opts) {

  const _opts = Object.assign({}, opts, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
  });
  
  return fetch(url, _opts)
    .then( (res) => {
      if(res.status === 401) {
        localStorage.clear();
        dispatch(routeActions.push('/signin'));
        dispatch(openSnackbar('Your session expired.'));
      }
    });
}
