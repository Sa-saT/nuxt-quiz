from rest_framework import generics
from .models import Quiz
from .serializers import QuizSerializer

class QuizListCreateView(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()  # 全てのクイズを取得
    serializer_class = QuizSerializer  # 使用するシリアライザー

class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()  # 全てのクイズを取得
    serializer_class = QuizSerializer  # 使用するシリアライザー