from rest_framework import serializers
from .models import Quiz

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['question_id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer', 'times_asked', 'correct_rate']