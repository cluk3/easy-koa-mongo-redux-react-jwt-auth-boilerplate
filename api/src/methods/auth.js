import jwt from 'jsonwebtoken';
import config from '../../../config';

const auth = function* (next) {

  this.login = (user) => {
    const payload = {
      username: user.username
    };
    const opts = {
      expiresIn: '1d',
      issuer: config.app.host + ':' + config.app.port,
      subject: user._id
    };
    const token = jwt.sign(payload, config.jwt.secret, opts); //could throw err
    this.state.user= {
      id: user._id,
      username: user.username
    };
    this.state.jwt = token;
  };

  this.isAuthenticated = () => {
    let token;
    const authHeader = this.headers.authorization.split(' ');
    if(authHeader[0] === 'Bearer')
      token = authHeader[1];
    else
      return false;
    if (!token) return false;
    try {
      const decoded = jwt.verify(token, config.jwt.secret, {
        issuer: config.app.host + ':' + config.app.port,
      });
      this.state.user= {
        id: decoded.sub,
        username: decoded.username
      };
    } catch (err) {
      return false;
    }
    return true;
  };

  this.isCurrentUser = (user_id) => {
    return user_id === this.state.user._id;
  };

  yield next;
};

export default auth;
