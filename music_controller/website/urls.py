from django.urls import path
from . import views

urlpatterns = [
    path('main', views.index, name='main'),
    path('create', views.index),
    path('join', views.index),
    path('room/<str:roomId>/', views.index)
]