import pytest
import json

class TestMember:

    def test_get_no_members(self, client):
        resp = client.get('/members')
        assert len(json.loads(resp.data)) == 0

    def test_add_member(self, client, full_memb):
        resp = client.post('/members', data=full_memb)
        assert resp.status_code == 200

        resp = client.get('/members')
        data = json.loads(resp.data)
        assert len(data) == 1

    def test_added_member_data(self, client, full_memb):
        client.post('/members', data=full_memb)
        resp = client.get('/members/1')

        data = json.loads(resp.data)
        assert data['first_name'] == full_memb['first_name']
        assert data['registered'] == full_memb['registered']

    def test_edit_by_sid(self, client, full_memb):
        client.post('/members', data=full_memb)
        client.post('/members', data={"first_name": "edited", "sid":full_memb['sid']})

        resp = client.get('/members/1')
        data = json.loads(resp.data)
        assert data['first_name'] == 'edited'


    def test_fail_to_unregister(self, client, full_memb):
        client.post('/members', data=full_memb)
        client.post('/members', data={"registered": False, "sid":full_memb['sid']})

        resp = client.get('/members/1')
        data = json.loads(resp.data)
        assert data['first_name'] == full_memb['first_name']
        assert data['registered'] == True

    def test_register_unreg_member(self, client, unreg_memb):
        client.post('/members', data=unreg_memb)
        client.post('/members', data={"registered": True, "access":unreg_memb['access']})

        resp = client.get('/members/1')
        data = json.loads(resp.data)
        assert data['registered'] == True

    def test_mult_members(self, client, full_memb, unreg_memb):
        client.post('/members', data=unreg_memb)
        client.post('/members', data=full_memb)

        resp1 = client.get('/members/1')
        data = json.loads(resp1.data)
        assert data['first_name'] == unreg_memb['first_name']

        resp2 = client.get('/members/2')
        data = json.loads(resp2.data)
        assert data['first_name'] == full_memb['first_name']
        
