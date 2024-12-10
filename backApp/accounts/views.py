from django.shortcuts import render
from rest_framework.permissions import IsAdminUser
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import CustomUserSerializer, CustomUserCreateSerializer

User = get_user_model()

# ユーザー管理のための管理者ビューセット
class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]

class UserCreateView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserCreateSerializer