from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Quiz
from django.test import TestCase
from django.db import connections

class QuizTests(APITestCase):
    def setUp(self):
        self.quiz_data = {
            'question_text': 'What is the capital of France?',
            'option_a': 'Berlin',
            'option_b': 'Madrid',
            'option_c': 'Paris',
            'option_d': 'Rome',
            'correct_answer': 'C',
            'times_asked': 0,
            'correct_rate': 0.0
        }
        self.response = self.client.post(reverse('quiz-list-create'), self.quiz_data)

    def test_create_quiz(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)  # 作成成功を確認
        self.assertEqual(Quiz.objects.count(), 1)  # クイズが1つ作成されたことを確認
        self.assertEqual(Quiz.objects.get().question_text, 'What is the capital of France?')  # 内容を確認

    def test_get_quiz(self):
        quiz = Quiz.objects.get()
        response = self.client.get(reverse('quiz-detail', kwargs={'pk': quiz.question_id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # 取得成功を確認
        self.assertEqual(response.data['question_text'], quiz.question_text)  # 内容を確認

class DatabaseConnectionTest(TestCase):
    def test_postgresql_connection(self):
        try:
            connection = connections['default']
            self.assertTrue(connection.is_usable(), "Connection is not usable.")
        except Exception as e:
            self.fail(f"An error occurred: {e}")