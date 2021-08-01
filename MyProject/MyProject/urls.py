"""MyProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from api_basic.views import CustomUserCreate
from django.contrib import admin
from django.urls import path,include
from api_basic.views import ArticleViewSet, CustomTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/article/', ArticleViewSet.as_view({'get':'list', 'post':'create'})),
    path('api/article/<int:pk>', ArticleViewSet.as_view({'get':'retrieve','put':'update', 'delete':'destroy'})),
    path('api/auth/register/', CustomUserCreate.as_view()),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]
