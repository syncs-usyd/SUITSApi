# SUITSApi
A basic RESTful API for SUITS in charge of memberships, events and attendance keeping.

The full documentation for the API can be found [here](https://apidocs.suits.org.au)

## Installation 
To get this running locally you'll need to have MySQL installed and a database called `api` set up specifically for this api.

(Don't try to use sqlite because it doesn't have good support for foreign key constraints.)

It is recommended to run this api in a `venv`. The following steps should get it running:

1. Set up a virtualenv and source it:
    * `virtualenv -p python3.6 venv`
    * `source venv/bin/activate`

2. Install the required packages:
    * `pip install -r requirements.txt`

3. Check your database connection:
    * `mysql -u dbuser -p`
    * Enter your `dbpass` at the prompt
    * `SHOW DATABASES;`
    * You should see `api` as one of the databases listed.

4. Start the api:
    * `python run.py`
    * You can start development mode which also sets up the database tables by running:
        * `python run.py --dev`
