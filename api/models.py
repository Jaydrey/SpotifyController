from django.db import models
import string, random
from datetime import datetime
# Create your models here.

def generate_id() -> str:
    length = 10
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    nums = string.digits
    u_code = lower+upper+nums
    while True:
        shuffled_code = random.sample(u_code, length)
        if not Room.objects.filter(room_id=''.join(shuffled_code)):
            break
    return ''.join(shuffled_code)

class Room(models.Model):
    room_id = models.CharField(max_length=10, unique=True, default=generate_id)
    room_name =models.CharField(max_length=100)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    participants = models.IntegerField(null=False, default=0)
    current_song = models.CharField(max_length=200, editable=True, help_text='Current Playing Song')
    created_at = models.DateTimeField(auto_now_add=True)

    

    def __str__(self) -> str:
        return f'{self.room_name}'

