from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # "api/v1"は習慣。"auth"でも良い。
    path('auth/', include('accounts.urls')),
    path('api/', include('job.urls')),
]