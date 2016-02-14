var path = require("path");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var base = {
  app: {
    root: path.normalize(path.join(__dirname)),
    env: env,
  },
  jwt: {
    secret: "1ts4s3cr37!"
  },
};

var specific = {
  development: {
    app: {
      port: 3000,
      name: "Koa React Mongoose Mocha - Dev",
      keys: [ "super-secret-hurr-durr" ],
      host: "localhost",
      cookies: {
        opts: {
          secure: false,
          maxAge: 3600000,
          signed: true,
          overwrite: true
        }
      },
    },
    mongo: {
      url: "mongodb://localhost/votingapp_dev",
    },
  },
  test: {
    app: {
      port: 3001,
      name: "Koa React Mongoose Mocha - Test realm",
      keys: [ "super-secret-hurr-durr" ],
      host: "localhost",
      cookies: {
        opts: {
          secure: false,
          maxAge: 3600000,
          signed: true,
          overwrite: true
        }
      },
    },
    mongo: {
      url: "mongodb://localhost/votingapp_test",
    },
  },
  production: {
    app: {
      port: process.env.PORT || 3000,
      name: "Koa React Mongoose Mocha",
      host: "production host",
      cookies: {
        opts: {
          secure: true,
          maxAge: 3600000,
          signed: true,
          overwrite: true
        }
      }
    },
    mongo: {
      url: "mongodb://localhost/votingapp",
    },
  },
};

module.exports = Object.assign({},base, specific[env]);
