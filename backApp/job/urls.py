from django.urls import path
from .views import QuizListCreateView, QuizDetailView

urlpatterns = [
    path('quizes/', QuizListCreateView.as_view(), name='quiz-list-create'),  # クイズの一覧取得・作成
    path('quizes/<int:pk>/', QuizDetailView.as_view(), name='quiz-detail'),  # 特定のクイズの取得・更新・削除
]