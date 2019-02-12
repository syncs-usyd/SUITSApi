# SUITSApi

A basic RESTful API for SUITS in charge of memberships, events and attendance keeping.

The full documentation for the API can be found [here](https://apidocs.suits.org.au)

## Installation

To get this running locally you'll need to have MySQL installed and a database called `api` set up specifically for this api.

(Don't try to use sqlite because it doesn't have good support for foreign key constraints.)

NOTE: currently migrating to TypeScript, so this will be updated

3. Check your database connection:
    - `mysql -u dbuser -p`
    - Enter your `dbpass` at the prompt
    - `SHOW DATABASES;`
    - You should see `api` as one of the databases listed.
