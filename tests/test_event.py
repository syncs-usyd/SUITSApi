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

    def test_del_event(self, client, event1):
        client.post('/events', data=event1)
        resp = client.delete('/events/1')
        assert resp.status_code == 200

        resp = client.get('/events/1')
        assert resp.status_code == 404

