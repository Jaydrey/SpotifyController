from django.shortcuts import render
from rest_framework import generics, status
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            room_name = serializer.data.get('room_name')
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            
            query = Room.objects.filter(host=host)
            if query.exists():
                room = query[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.room_name = room_name

                room.save(update_fields=['room_name', 'guest_can_pause', 'votes_to_skip'])

            else:
                room = Room(host=host, room_name=room_name,\
                    guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()

            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'room_id'
    def get(self, request, format=None):
        room_id = request.GET.get(self.lookup_url_kwarg)
        if room_id != None:
            room = Room.objects.filter(room_id=room_id)
            if len(room) >0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({'Room Not Found': 'Invalid room id'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'Bad Request': 'Room id not given in request'}, status=status.HTTP_400_BAD_REQUEST)