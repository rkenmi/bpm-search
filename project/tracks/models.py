from django.db import models

# Create your models here.


class Track(models.Model):
    genre = models.CharField(max_length=30)
    artist_name = models.CharField(max_length=50)
    track_name = models.CharField(max_length=100)
    track_id = models.CharField(max_length=50)
    popularity = models.FloatField(null=True)
    acousticness = models.FloatField(null=True)
    danceability = models.FloatField(null=True)
    duration_ms = models.BigIntegerField()
    energy = models.FloatField(null=True)
    instrumentalness = models.DecimalField(null=True, decimal_places=10, max_digits=10)
    key = models.CharField(blank=True, max_length=5)
    liveness = models.FloatField(null=True)
    loudness = models.FloatField(null=True)
    mode = models.FloatField(null=True)
    speechiness = models.FloatField(null=True)
    tempo = models.FloatField()
    time_signature = models.CharField(blank=True, max_length=10)
    valence = models.FloatField(null=True)


