import 'babel-polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/server';
import mongoose from 'mongoose';
import config from '../../config';


describe('Signup', () => {

  it('should return json with user id and name', (done) => {
    request(app)
    .post('/signup')
    .type('form')
    .send({
      username: 'lucaaa',
      password: 'wordpass'
    })
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function(err, res){
      if (err) return done(err);
      expect(err).to.be.null;
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.attributes.username).to.equal('lucaaa');
      expect(res.body.data.links.self).to.match(/users\/lucaaa$/);
      done();
    });
  });


  it('should login the user', (done) => {
    request(app)
    .post('/signup')
    .type('form')
    .send({
      username: 'campli',
      password: 'wordpass'
    })
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function(err, res){
      if (err) return done(err);
      expect(res.body.data.jwt).to.be.ok;
      done();
    });
  });

  it('should return error if response has no username field', (done) => {
    request(app)
    .post('/signup')
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
    .post('/signup')
    .send({
      username: 'luca'
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
    .post('/signup')
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res){
      expect(res.body.errors).to.eql(['Missing username','Missing password']);
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropCollection('users', (err, result) => {
      if (err) console.log(err);
      done();
    });
  });
});
