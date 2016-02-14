import 'babel-polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/server';
import mongoose from 'mongoose';
import config from '../../config';

describe('Sign in', () => {

  before( function(done) {
    const User = mongoose.model('User');
    const user = new User({ username: 'john', password: 'wordpass' });
    user.save().then(() => done());
  });

  it('should return json with jwt and user id', (done) => {
    request(app)
    .post('/signin')
    .type('form')
    .send({
      username: 'john',
      password: 'wordpass'
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      expect(err).to.be.null;
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.attributes.username).to.equal('john');
      expect(res.body.data.links.self).to.match(/users\/john$/);
      done();
    });
  });

  it('should return a jwt', (done) => {
    request(app)
    .post('/signin')
    .type('form')
    .send({
      username: 'john',
      password: 'wordpass'
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      expect(res.body.data.jwt).to.be.ok
      done();
    });
  });

  it('should return error if response has no username field', (done) => {
    request(app)
    .post('/signin')
    .send({
      password: 'wordpass'
    })
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res){
      expect(res.body.errors).to.eql(['Missing username']);
      done();
    });
  });

  it('should return error if response has no password field', (done) => {
    request(app)
    .post('/signin')
    .send({
      username: 'john'
    })
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res){
      expect(res.body.errors).to.eql(['Missing password']);
      done();
    });
  });

  it('should return error if response has no psw and username field', (done) => {
    request(app)
    .post('/signin')
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res){
      expect(res.body.errors).to.eql(['Missing username','Missing password']);
      done();
    });
  });

  it('should return error if invalid username', (done) => {
    request(app)
    .post('/signin')
    .send({
      username: 'johny',
      password: 'wordpass'
    })
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res){
      expect(res.body.errors).to.eql(['Invalid username']);
      done();
    });
  });

  it('should return error if psw does not match', (done) => {
    request(app)
    .post('/signin')
    .send({
      username: 'john',
      password: 'wrongpass'
    })
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res){
      expect(res.body.errors).to.eql(['Password does not match']);
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropCollection('users', (err, result) => {
      if (err) done(err);
      done();
    });
  });
});
