from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminUserViewSet

router = DefaultRouter()
router.register('management/users', AdminUserViewSet, basename='management-users')

urlpatterns = [
    # Djoserの標準的なエンドポイント
    path('v1/', include('djoser.urls')),
    path('v1/', include('djoser.urls.jwt')),
    # 管理者用のカスタムエンドポイント
    path('management/', include(router.urls)),
]

# /auth/v1/users/ - ユーザー作成
# /auth/v1/users/me/ - 現在のユーザー情報
# /auth/v1/jwt/create/ - JWTトークン作成