from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_id', 'room_name', 'host', 'guest_can_pause',\
            'votes_to_skip', 'participants', 'current_song', 'created_at')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('room_name', 'guest_can_pause', 'votes_to_skip')