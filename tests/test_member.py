import pytest
import json

class TestMember:

    def test_get_no_members(self, auth_client):
        resp = auth_client.get('/members')
        assert len(json.loads(resp.data)) == 0


    def test_add_member(self, auth_client, full_memb):
        resp = auth_client.post('/members', data=full_memb)
        assert resp.status_code == 200

        resp = auth_client.get('/members')
        data = json.loads(resp.data)
        assert len(data) == 1


    def test_added_member_data(self, auth_client, full_memb):
        auth_client.post('/members', data=full_memb)
        resp = auth_client.get('/members/1')

        data = json.loads(resp.data)
        assert data['firstName'] == full_memb['first_name']
        assert data['registered'] == full_memb['registered']


    def test_edit_by_sid(self, auth_client, full_memb):
        auth_client.post('/members', data=full_memb)
        auth_client.post('/members', data={"first_name": "edited", "sid":full_memb['sid']})

        resp = auth_client.get('/members/1')
        data = json.loads(resp.data)
        assert data['firstName'] == 'edited'


    def test_fail_to_unregister(self, auth_client, full_memb):
        auth_client.post('/members', data=full_memb)
        auth_client.post('/members', data={"registered": False, "sid":full_memb['sid']})

        resp = auth_client.get('/members/1')
        data = json.loads(resp.data)
        assert data['firstName'] == full_memb['first_name']
        assert data['registered'] == True


    def test_register_unreg_member(self, auth_client, unreg_memb):
        auth_client.post('/members', data=unreg_memb)
        auth_client.post('/members', data={"registered": True, "access":unreg_memb['access']})

        resp = auth_client.get('/members/1')
        data = json.loads(resp.data)
        assert data['registered'] == True


    def test_mult_members(self, auth_client, full_memb, unreg_memb):
        auth_client.post('/members', data=unreg_memb)
        auth_client.post('/members', data=full_memb)

        resp1 = auth_client.get('/members/1')
        data = json.loads(resp1.data)
        assert data['firstName'] == unreg_memb['first_name']

        resp2 = auth_client.get('/members/2')
        data = json.loads(resp2.data)
        assert data['firstName'] == full_memb['first_name']

