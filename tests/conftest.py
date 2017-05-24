from app import app
from db import db
import pytest

@pytest.fixture
def client():
    #TODO DB setup code
    db.drop_all()
    db.create_all()
    yield app.test_client()

    #TODO Teardown code
    print("Tearing down")


