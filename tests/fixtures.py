import pytest
from app import app, db
from settings import TEST_TOKEN
from tests.flask_auth_client import FlaskAuthClient

@pytest.fixture(autouse=True)
def db_setup():
    #TODO DB setup code
    db.create_all()
    yield
    #TODO Teardown code
    db.drop_all()


@pytest.fixture(scope='session')
def auth_client():
    app.wsgi_app = FlaskAuthClient(app.wsgi_app, TEST_TOKEN)
    return app.test_client()


@pytest.fixture(scope='session')
def unauth_client():
    return app.test_client()


@pytest.fixture
def full_memb():
    return {
        "first_name": "John",
        "last_name": "Smith",
        "sid": 450543509,
        "access": 1509342,
        "newsletter": True,
        "doing_it": True,
        "registered": True
    }

@pytest.fixture
def unreg_memb():
    return {
        "first_name": "unregistered",
        "last_name": "member",
        "access": 1678208
    }

@pytest.fixture
def event1():
    return {
        "title": "Best event1",
        "description": "doot!"
    }


@pytest.fixture
def event2():
    return {
        "title": "Better than best event",
        "description": "You tell'em!"
    }
