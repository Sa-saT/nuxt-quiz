from django.shortcuts import render
from rest_framework.permissions import IsAdminUser
from rest_framework import viewsets, generics
from .models import User
from .serializers import UserCreateSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

# JWTログインビュー
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# ユーザー管理のための管理者ビューセット
class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [IsAdminUser]

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer