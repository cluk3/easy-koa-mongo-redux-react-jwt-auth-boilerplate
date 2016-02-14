import r from 'koa-route';
import { signup, signin, authenticated, changePassword } from '../methods/user';

export default (app) => {

  app.use(r.get('/', function *() {
    this.body = {message: "Hello world!"};
    })
  );
  app.use(r.post('/signup',signup));
  app.use(r.post('/signin',signin));

  app.use(authenticated);
  app.use(r.patch('/change-password', changePassword));
};
