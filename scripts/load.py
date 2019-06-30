import csv
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
from collections import namedtuple
Track = namedtuple('Track', ['genre', 'artist_name', 'track_name', 'track_id', 'popularity', 'acousticness',
                             'danceability', 'duration_ms', 'energy', 'instrumentalness', 'key', 'liveness',
                             'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence'])

es = Elasticsearch(
    'elasticsearch',
)

if __name__ == '__main__':
    s = Search(using=es).filter('range', tempo={'gte': 30, 'lt': 300})
    # s = s[10:20]
    res = s.execute()
    for d in res:
        print(d.meta)
        print(d['tempo'])
    print(len(res))
