from app import app
from settings import TEST_DB_USER, TEST_DB_PASS, JWT_USER, JWT_PASS, TEST_TOKEN

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://{}:{}@localhost:3306/api_test'.format(TEST_DB_USER, TEST_DB_PASS)

from tests.fixtures import *
