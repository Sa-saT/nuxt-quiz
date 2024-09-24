from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomTokenObtainPairView, AdminUserViewSet, UserCreateView

router = DefaultRouter()
router.register('management/users', AdminUserViewSet, basename='management-users')

urlpatterns = [
    path('', include(router.urls)),
    # トークンを取得するためのログインエンドポイント
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # 登録やパスワードリセット用
    path('v1/', include('djoser.urls')),
    # JWT認証用のDjoserのURLをインクルード
    path('v1/', include('djoser.urls.jwt')),
    # 新しいユーザーを作成するためのエンドポイント
    path('user/create/', UserCreateView.as_view(), name='user-create'),
]