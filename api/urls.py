from django.urls import path
from . views import RoomView, CreateRoomView, GetRoom

urlpatterns = [
    path('room', RoomView.as_view(), name='room'),
    path('create_room', CreateRoomView.as_view(), name='create_room'),
    path('get_room', GetRoom.as_view(), name='get_room')
]