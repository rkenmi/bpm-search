import os
import csv
from collections import namedtuple

TrackTuple = namedtuple('Track', ['genre', 'artist_name', 'track_name', 'track_id', 'popularity', 'acousticness',
                             'danceability', 'duration_ms', 'energy', 'instrumentalness', 'key', 'liveness',
                             'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence'])

# PYTHONIOENCODING=utf-8 python save.py
def save():
    count = 0
    actions = []
    with open('data.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        next(reader)
        for row in reader:
            t = TrackTuple(*row)
            track = Track()
            track.genre = t.genre
            track.artist_name = t.artist_name
            track.track_id = t.track_id
            track.track_name = t.track_name
            track.duration_ms = t.duration_ms
            track.tempo = t.tempo
            track.save()
            # action = {
            #     "_index": "tracks-index",
            #     "_type": "tracks",
            #     "_id": t.track_id,
            # }
            #
            # action.update(t._asdict())
            # actions.append(action)
            count += 1

    # helpers.bulk(es, actions)

if __name__ == '__main__':
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    import django
    django.setup()
    from project.tracks.models import Track
    save()
