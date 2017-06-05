import pytest
import json

class TestEvent:

    def test_no_events(self, client):
        resp = client.get('/events')
        data = json.loads(resp.data)
        assert len(data) == 0

    def test_add_event(self, client, event1):
        resp = client.post('/events', data=event1)
        assert resp.status_code == 200

        resp = client.get('/events')
        print(resp)
        data = json.loads(resp.data)
        assert len(data) == 1

    def test_added_event_data(self, client, event1):
        client.post('/events', data=event1)

        resp = client.get('/events/1')
        data = json.loads(resp.data)
        print(data)

        assert data['title'] == event1['title']
        assert len(data['members_attended']) == 0

    def test_put_event_data(self, client, event1, event2):
        client.post('/events', data=event1)
        client.put('/events/1', data=event2)

        resp = client.get('/events/1')
        data = json.loads(resp.data)
        assert data['title'] == event2['title']

    def test_del_event(self, client, event1, full_memb):
        client.post('/events', data=event1)
        client.post('/members', data=full_memb)

        client.post('/attendance', query_string={'member':1, 'event':1}, data={'primary': True})

        resp = client.delete('/events/1')
        assert resp.status_code == 200

        resp = client.get('/events/1')
        assert resp.status_code == 404

        resp = client.get('/attendance/1')
        assert resp.status_code == 404

    def test_add_mult_event(self, client, event1, event2):
        client.post('/events', data=event1)
        client.post('/events', data=event2)

        resp1 = client.get('/events/1')
        data = json.loads(resp1.data)
        assert data['title'] == event1['title']

        resp2 = client.get('/events/2')
        data = json.loads(resp2.data)
        assert data['title'] == event2['title']
