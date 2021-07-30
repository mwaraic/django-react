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
# Create your views here.

class GenericAPIView(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin):
    serializer_class=ArticleSerializer
    queryset= Article.objects.all()
    lookup_field='id'
    authentication_classes={SessionAuthentication, BasicAuthentication}
    permission_classes= [IsAuthenticated]
    def get(self, request, id=None):
        if id:
           return self.retrieve(request)
        else:
           return self.list(request)
    def post(self,request):
        return self.create(request)
    def put(self, request, id):
        return self.update(request, id)
    def delete(self, request, id):
        return self.delete(request, id)
    

class ArticleAPIView(APIView):
    def get(self, request):
        articles= Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer= ArticleSerializer(data=request.data)       
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class=ArticleSerializer
    queryset= Article.objects.all()
    authentication_classes={TokenAuthentication}
    permission_classes= [IsAuthenticated]



class DetailAPIView(APIView):
    def get_object(self, id):
        try:
            return Article.objects.get(pk=id)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request, id):
        article= self.get_object(id)
        serializer= ArticleSerializer(article)
        return Response(data=serializer.data)

    def put(self, request, id):
        article= self.get_object(id)
        serializer=ArticleSerializer(request.data)
        if serializer.is_valid:
            serializer.update(article, request.data)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        article=self.get_object(id)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def article_list(request):

    if request.method == 'GET':
        articles= Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)
    elif request.method=='POST': 
        serializer= ArticleSerializer(data=request.data)       
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def article_detail(request, pk):

    try:
        article= Article.objects.get(pk=pk)
    except:
        return HttpResponse(status=404)

    if request.method == 'GET':
          serializer= ArticleSerializer(article)
          return Response(serializer.data)

    elif request.method =='PUT':
        serializer= ArticleSerializer(data=request.data)

        if serializer.is_valid():
            serializer.update(article,request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
