import 'babel-polyfill';

import Koa from 'koa';
//import routes from './routes';
import * as db from './db';

const app = new Koa()

//app.use(routes)

app.listen(3000)
db.test()

