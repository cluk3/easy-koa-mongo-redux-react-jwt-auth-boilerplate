import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import mongoose from 'mongoose';
import routes from './routes';
import logger from 'koa-logger';
import config from '../../config';
import auth from './methods/auth';
import dbConfig from './db_config';
import cors from 'koa-cors';

const app = koa();

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET','HEAD','PUT','POST','DELETE','PATCH']
}));

dbConfig();

if (config.app.env !== "test") {
  app.use(logger());
}
app.use(auth);
app.use(bodyparser());

app.use(function *(next) {
  this.type = 'json';
  yield next;
});

routes(app);

export default app.listen(config.app.port);
