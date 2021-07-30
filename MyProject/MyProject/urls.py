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
from django.contrib import admin
from django.urls import path, include
from api_basic.views import GenericAPIView, article_list
from api_basic.views import article_detail
from api_basic.views import ArticleAPIView
from api_basic.views import ArticleViewSet
from api_basic.views import DetailAPIView
import dj_rest_auth

urlpatterns = [
    path('admin/', admin.site.urls),
    path('article/', ArticleAPIView.as_view()),
    path('sets/', ArticleViewSet.as_view({'get':'list', 'post':'create'})),
    path('sets/<int:pk>', ArticleViewSet.as_view({'get':'retrieve','put':'update', 'delete':'destroy'})),
    path('article/<int:id>', DetailAPIView.as_view()),
    path('generic/article/', GenericAPIView.as_view()),
    path('generic/article/<int:id>', GenericAPIView.as_view()),
    path('account/', include('dj_rest_auth.urls'))
    
]
