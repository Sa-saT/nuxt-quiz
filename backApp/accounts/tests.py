from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User
from django.test import TestCase
# from django_redis.cache import RedisCache as SessionStore
from django.contrib.sessions.backends.cache import SessionStore
from django.core.cache import cache
from django.conf import settings
import redis

class UserTests(APITestCase):
    
    def test_create_user(self):
        url = reverse('user-create')
        data = {'email': 'test@example.com', 'password': 'testpassword'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_login(self):
        self.user = User.objects.create_user(email='test@example.com', password='testpassword')
        url = reverse('token_obtain_pair')
        data = {'email': 'test@example.com', 'password': 'testpassword'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class RedisSessionTestCase(TestCase):
    def setUp(self):
        self.session = SessionStore()

    
    def test_cache_set_and_get(self):
        
        # キャッシュにデータを保存
        cache.set('my_key', 'my_value', timeout=40*15)
        
        # キャッシュからデータを取得
        value = cache.get('my_key')
        self.assertEqual(value, 'my_value')

    def test_session_save_and_load(self):
        self.session['test_key'] = 'test_value'
        self.session.save()
        
        # 新しいセッションを作成して、保存したデータを読み込む
        new_session = SessionStore(session_key=self.session.session_key)
        new_session.load()
        
        self.assertEqual(new_session['test_key'], 'test_value')

    def test_session_delete(self):
        self.session['test_key'] = 'test_value'
        self.session.save()
        
        # セッションを削除
        self.session.delete()
        
        # 削除されたセッションを読み込もうとする
        new_session = SessionStore(session_key=self.session.session_key)
        new_session.load()
        
        self.assertNotIn('test_key', new_session)

    def test_redis_connection(self):
        redis_client = redis.Redis.from_url(settings.CACHES['default']['LOCATION'])
        self.assertTrue(redis_client.ping())