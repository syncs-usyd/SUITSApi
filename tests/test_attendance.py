import pytest
import json

class TestAttendance:

    def test_no_attendance(self, client):
        resp = client.get('/attendance')

        assert resp.status_code == 404


    def test_add_att(self, client, full_memb, event1):
        client.post('/members', data=full_memb)
        client.post('/events', data=event1)
        client.post('/attendance', query_string={'member':1, 'event':1}, data={'primary':True,'secondary': True, 'additional': None})

        resp = client.get('/attendance')
        data = json.loads(resp.data)
        assert len(data) == 1
        data = data[0]
        assert data['member']['id'] == 1
        assert data['event']['id'] == 1
        assert data['primary'] == True

    def test_add_bad_att(self, client, full_memb, event1):
        client.post('/members', data=full_memb)
        client.post('/events', data=event1)
        resp = client.post('/attendance', query_string={'member':1, 'event':10}, data={'primary':True,'secondary': True, 'additional': None})

        assert resp.status_code == 400

    def test_missing_event_in_qs(self, client, full_memb, event1):
        client.post('/members', data=full_memb)
        client.post('/events', data=event1)
        resp = client.post('/attendance', query_string={'member':1}, data={'primary':True,'secondary': True, 'additional': None})

        assert resp.status_code == 400

    def test_del_att(self, client, full_memb, event1):
        client.post('/members', data=full_memb)
        client.post('/events', data=event1)
        client.post('/attendance', query_string={'member':1}, data={'primary':True,'secondary': True, 'additional': None})

        client.delete('/attendance/1')

        resp = client.get('/attendance/1')
        assert resp.status_code == 404




