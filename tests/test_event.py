import pytest
import json

class TestEvent:

    def test_no_events(self, auth_client):
        resp = auth_client.get('/events')
        data = json.loads(resp.data)
        assert len(data) == 0


    def test_add_event(self, auth_client, event1):
        resp = auth_client.post('/events', data=event1)
        assert resp.status_code == 200

        resp = auth_client.get('/events')
        print(resp)
        data = json.loads(resp.data)
        assert len(data) == 1


    def test_added_event_data(self, auth_client, event1):
        auth_client.post('/events', data=event1)

        resp = auth_client.get('/events/1')
        data = json.loads(resp.data)
        print(data)

        assert data['title'] == event1['title']
        assert len(data['membersAttended']) == 0


    def test_put_event_data(self, auth_client, event1, event2):
        auth_client.post('/events', data=event1)
        auth_client.put('/events/1', data=event2)

        resp = auth_client.get('/events/1')
        data = json.loads(resp.data)
        assert data['title'] == event2['title']


    def test_del_event(self, auth_client, event1, full_memb):
        auth_client.post('/events', data=event1)
        auth_client.post('/members', data=full_memb)

        auth_client.post('/attendance', query_string={'member':1, 'event':1}, data={'primary': True})

        resp = auth_client.delete('/events/1')
        assert resp.status_code == 200

        resp = auth_client.get('/events/1')
        assert resp.status_code == 404

        resp = auth_client.get('/attendance/1')
        assert resp.status_code == 404


    def test_add_mult_event(self, auth_client, event1, event2):
        auth_client.post('/events', data=event1)
        auth_client.post('/events', data=event2)

        resp1 = auth_client.get('/events/1')
        data = json.loads(resp1.data)
        assert data['title'] == event1['title']

        resp2 = auth_client.get('/events/2')
        data = json.loads(resp2.data)
        assert data['title'] == event2['title']
