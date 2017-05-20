import unittest
from app import app
from db import db
import json

class TestMember(unittest.TestCase):
    def setUp(self):
        db.drop_all()
        db.create_all()
        self.app = app.test_client()

    def test_empty_members(self):
        resp = self.app.get('/members')
        resp_data = json.loads(resp.data)
        self.assertEqual(resp_data, [])

    def test_add_member(self, data=None):
        if not data:
            data = {
                "first_name": "dave",
                "last_name": "null",
                "email": "test@test.com",
                "gender": "male",
                "sid": 123456789,
                "access": 1243654,
                "registered": True,
                "newsletter": True,
                "doing_it": True
            }

        resp = self.app.post('/members', data=data)
        self.assertEqual(resp.status_code, 200)

    def test_get_member(self):
        self.test_add_member()
        resp = self.app.get('/members/1')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertEqual(data['id'], 1)
        self.assertEqual(data['first_name'], "dave")
        self.assertEqual(data['sid'], 123456789)
        self.assertEqual(data['registered'], True)

    def test_get_member_list(self):
        self.test_add_member()
        resp = self.app.get('/members')
        resp_data = json.loads(resp.data)
        self.assertEqual(len(resp_data), 1)

    def test_edit_member_sid(self):
        self.test_add_member()
        self.test_add_member(data={'sid':123456789, 'first_name':'dave_edited'})
        resp = self.app.get('/members/1')
        data = json.loads(resp.data)
        self.assertEqual(data['first_name'], 'dave_edited')
        self.assertEqual(data['last_name'], 'null')

