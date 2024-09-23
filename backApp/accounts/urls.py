from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomTokenObtainPairView, AdminUserViewSet, UserCreateView

router = DefaultRouter()
router.register('management/users', AdminUserViewSet, basename='management-users')

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('v1/', include('djoser.urls')),  # 登録やパスワードリセット用
    path('v1/', include('djoser.urls.jwt')),
    path('', include(router.urls)),
    path('user/create/', UserCreateView.as_view(), name='user-create'),
]