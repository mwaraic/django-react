
from datetime import date
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, request
from django.views import generic
from rest_framework.parsers import JSONParser
from .models import Article
from .serializers import ArticleSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status, viewsets
from rest_framework.views import APIView
from rest_framework import generics, mixins
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class=ArticleSerializer
    permission_classes= [IsAuthenticated]
    
    def get_queryset(self):
        print(self.request.user)
        return Article.objects.filter(user_name=self.request.user).order_by('-date')



class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)