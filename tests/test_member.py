import pytest
import json

class TestMember:

    full_memb = {
        "first_name": "John",
        "last_name": "Smith",
        "sid": 450543509,
        "access": 1509342,
        "newsletter": True,
        "doing_it": True,
        "registered": True
    }

    unreg_memb = {
        "first_name": "unregistered",
        "last_name": "member",
        "access": 1678208
    }

    def test_get_no_members(self, client):
        resp = client.get('/members')
        assert len(json.loads(resp.data)) == 0

    def test_add_member(self, client):
        resp = client.post('/members', data=self.full_memb)
        assert resp.status_code == 200

        resp = client.get('/members')
        data = json.loads(resp.data)
        assert len(data) == 1

    def test_added_member_data(self, client):
        client.post('/members', data=self.full_memb)
        resp = client.get('/members/1')

        data = json.loads(resp.data)
        assert data['first_name'] == self.full_memb['first_name']
        assert data['registered'] == self.full_memb['registered']

    def test_edit_by_sid(self, client):
        client.post('/members', data=self.full_memb)
        client.post('/members', data={"first_name": "edited", "sid":self.full_memb['sid']})

        resp = client.get('/members/1')
        data = json.loads(resp.data)
        assert data['first_name'] == 'edited'


    def test_fail_to_unregister(self, client):
        client.post('/members', data=self.full_memb)
        client.post('/members', data={"registered": False, "sid":self.full_memb['sid']})
        resp = client.get('/members/1')
        data = json.loads(resp.data)
        assert data['first_name'] == self.full_memb['first_name']
        assert data['registered'] == True

