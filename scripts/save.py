import csv
from elasticsearch import Elasticsearch
from elasticsearch import helpers
from collections import namedtuple
Track = namedtuple('Track', ['genre', 'artist_name', 'track_name', 'track_id', 'popularity', 'acousticness',
                             'danceability', 'duration_ms', 'energy', 'instrumentalness', 'key', 'liveness',
                             'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence'])



es = Elasticsearch(
    'localhost'
)
# PYTHONIOENCODING=utf-8 python save.py
def load():
    count = 0
    actions = []
    with open('data.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        next(reader)
        for row in reader:
            t = Track(*row)
            action = {
                "_index": "tracks-index",
                "_type": "tracks",
                "_id": t.track_id,
            }

            action.update(t._asdict())
            actions.append(action)
            count += 1

    helpers.bulk(es, actions)

if __name__ == '__main__':
    load()
