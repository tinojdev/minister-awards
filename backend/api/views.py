from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets, permissions

from .models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


def index(request):
    return HttpResponse("Hello, World!")
