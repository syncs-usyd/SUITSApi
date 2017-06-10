import pytest
import json
from settings import JWT_USER, JWT_PASS

class TestAuth:

    def test_wrong_pass(self, unauth_client):
        resp = unauth_client.post('/token', data={'user': 'not', 'pass': 'this'})
        assert resp.status_code == 401

    def test_good_auth(self, unauth_client):
        resp = unauth_client.post('/token', data={'user': JWT_USER, 'pass': JWT_PASS})
        assert resp.status_code == 200

    def test_unauth_members(self, unauth_client):
        resp = unauth_client.get('/members')

        assert resp.status_code == 401

    def test_unauth_events(self, unauth_client):
        resp = unauth_client.get('/events')

        assert resp.status_code == 401

    def test_unauth_attendance(self, unauth_client):
        resp = unauth_client.get('/attendance')

        assert resp.status_code == 401
