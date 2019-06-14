import os
import csv
from collections import namedtuple

TrackTuple = namedtuple('Track', ['genre', 'artist_name', 'track_name', 'track_id', 'popularity', 'acousticness',
                             'danceability', 'duration_ms', 'energy', 'instrumentalness', 'key', 'liveness',
                             'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence'])

def save():
    count = 0
    with open('data.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        next(reader)
        for row in reader:
            t = TrackTuple(*row)
            track, created = Track.objects.get_or_create(
                track_id=t.track_id,
                defaults={
                    'duration_ms': t.duration_ms,
                    'artist_name': t.artist_name,
                    'track_name': t.track_name,
                    'tempo': int(float(t.tempo))
                }
            )

            genre, created = Genre.objects.get_or_create(
                name=t.genre
            )

            if created:
                genre.save()

            track.genres.add(genre)
            track.save()
            count += 1

if __name__ == '__main__':
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    import django
    django.setup()
    from project.tracks.models import Track, Genre

    save()
