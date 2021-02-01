# SUITSApi

A basic RESTful API for SUITS in charge of memberships, events and attendance keeping.

The full documentation for the API can be found [here](https://apidocs.suits.org.au)

## Installation

To get this running locally...

- Have MySQL installed (don't use sqlite because it doesn't have good support for foreign key constraints).
- Create a database called `api` specifically for this api.
- Create a database user with permissions on that database.
- Copy `config.example.json` to `config.json`, and `ormconfig.example.json` to `ormconfig.json` and update them as appropriate.
- Run `npm install`

To check your database connection:
    - `mysql -u dbuser -p`
    - Enter your `dbpass` at the prompt
    - `SHOW DATABASES;`
    - You should see `api` as one of the databases listed.
