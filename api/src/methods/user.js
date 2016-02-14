import User from '../models/user';
import config from '../../../config';

exports.authenticated = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

exports.signup = function *() {
  let result = { errors: [] };
  if (!this.request.body) {
    this.status = 400;
    result.errors.push('The body is empty');
  }
  if (!this.request.body.username) {
    this.status = 422;
    result.errors.push('Missing username');
  }
  if (!this.request.body.password) {
    this.status = 422;
    result.errors.push('Missing password');
  }
  if(this.status === 422 || this.status === 400)
    return this.body = result;

  try {
    var user = new User({ username: this.request.body.username, password: this.request.body.password });
    user = yield user.save();
    this.login(user);
    this.status = 201;
    this.body = {
      data: {
        type: 'users',
        id: user._id,
        jwt: this.state.jwt,
        attributes: {
          username: user.username
        },
        links: {
          self: config.app.host + ':' + config.app.port + "/users/" + user.username
        }
      }
    };
  } catch (err) {
    if(err.code === 11000) {
      this.status = 409;
      result.errors.push('The username already exists');
      return this.body = result;
    }
    this.throw(err, 500);
  }
};

exports.changePassword = function* () {
  const user = yield User.findById(this.state.user.id);
  if(yield user.comparePassword(this.request.body.oldPassword)) {
    user.password = this.request.body.newPassword;
    try {
      yield user.save();
    } catch (err) {
      console.log(err);
      return this.status = 500;
    }
    this.status = 204;
  } else {
    this.body = {
      errors: ["Wrong password"]
    };
    this.status = 422;
  }
};

exports.signin = function* () {

  let result = { errors: [] };
  if (!this.request.body) {
    this.status = 400;
    result.errors.push('The body is empty');
  }

  const { username, password } = this.request.body;

  if (!username) {
    this.status = 422;
    result.errors.push('Missing username');
  }
  if (!password) {
    this.status = 422;
    result.errors.push('Missing password');
  }
  if(this.status === 422 || this.status === 400)
    return this.body = result;

  try {
    const user = yield User.passwordMatches(username, password);
    this.login(user);
    this.body = {
      data: {
        type: 'users',
        id: user._id,
        jwt: this.state.jwt,
        attributes: {
          username: user.username
        },
        links: {
          self: config.app.host + ':' + config.app.port + "/users/" + user.username
        }
      }
    };
  } catch (err) {
    if(err.message  === "User not found") {
      this.status = 422;
      result.errors.push('Invalid username');
      return this.body = result;
    }
    if(err.message  === "Password does not match") {
      this.status = 422;
      result.errors.push(err.message);
      return this.body = result;
    }
    this.throw(err, 500);
  }

  this.status = 200;
};
