export const CLEAR_ERR = 'CLEAR_ERR';
export const SET_ERR = 'SET_ERR';

export function clearErr() {
  return {
    type: CLEAR_ERR
  };
}

export function setErr(err) {
  const errors = (typeof err === 'string') ? [err] : err;
  return {
    type: SET_ERR,
    errors
  };
}
