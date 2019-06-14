from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

# Create your models here.


class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta(object):
        verbose_name = _("Genre")
        verbose_name_plural = _("Genres")

    def __str__(self):
        return self.name


class Track(models.Model):
    # genre = models.CharField(max_length=100, blank=True)
    genres = models.ManyToManyField(Genre)
    artist_name = models.CharField(max_length=50)
    track_name = models.CharField(max_length=100)
    track_id = models.CharField(max_length=50, unique=True)
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
    tempo = models.IntegerField()
    time_signature = models.CharField(blank=True, max_length=10)
    valence = models.FloatField(null=True)

    @property
    def genres_indexing(self):
        """Genres for indexing.

        Used in Elasticsearch indexing.
        """
        return [g.name for g in self.genres.all()]

