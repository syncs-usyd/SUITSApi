import r from 'rethinkdbdash';
import config from '../config';

let db = r(config.db);

export default db;
