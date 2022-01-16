# SUITSApi

A basic RESTful API for SUITS in charge of memberships, events and attendance keeping.

The full documentation for the API can be found [here](https://apidocs.suits.org.au)

## Installation

To get this running locally...

- Have MySQL installed (don't use sqlite because it doesn't have good support for foreign key constraints).
- Create a database called `api` specifically for this api. And create a database user with permissions on that database, e.g.:
```sql
create database api;
create user api@localhost identified by 'cats';
grant all privileges on api.* to `api`@`localhost`;
```
- Ensure that the database is running.
- Copy `config.example.json` to `config.json`, and `ormconfig.example.json` to `ormconfig.json` and update them as appropriate.
    - Sentry DSN (you can just delete it)
    - Database details
    - If you want the database to create / update tables (say, because you are creating it for the first time) you should set `"synchronize": true`, though, apparently this should not be used in production.
- Run `npm install`
- Run `npm run build`
- Run `npm start`

To check your database connection:
    - `mysql -u dbuser -p`
    - Enter your `dbpass` at the prompt
    - `SHOW DATABASES;`
    - You should see `api` as one of the databases listed.
