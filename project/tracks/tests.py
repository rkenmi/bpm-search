from unittest import TestCase
from unittest.mock import patch

from django.db import models

import pytest


# Create your tests here.
from rest_framework.test import APIRequestFactory, RequestsClient

from project.tracks.documents import TrackDocument
from project.tracks.models import Track, Genre

factory = APIRequestFactory()

client = RequestsClient()


@pytest.mark.django_db
@pytest.mark.usefixtures('es_client')
class DocTypeTestCase(TestCase):

    def test_model_instance_update(self):
        doc = TrackDocument()

        # Create genres
        g1 = Genre(name='NuMetal')
        g2 = Genre(name='Pop')
        g1.save()
        g2.save()

        # Create tracks
        track = Track(track_name="Breaking the Habit", artist_name="Linkin Park", duration_ms=42000,
                  tempo=130, track_id="39a8xkcm13", id=100)
        track.save()
        track.genres.add(g1)
        track.genres.add(g2)

        with patch('django_elasticsearch_dsl.documents.bulk') as mock:
            doc.update(track)
            actions = [{
                '_id': track.pk,
                '_op_type': 'index',
                '_source': {
                    'track_name': track.track_name,
                    'artist_name': track.artist_name,
                    'duration_ms': track.duration_ms,
                    'tempo': track.tempo,
                    'track_id': track.track_id,
                    'id': track.id,
                    'genres': list(map(lambda x: x.name, [g1, g2])),
                },
                '_index': 'tracks',
                '_type': 'doc'
            }]
            self.assertEqual(1, mock.call_count)
            self.assertEqual(
                actions, list(mock.call_args_list[0][1]['actions'])
            )
            self.assertTrue(mock.call_args_list[0][1]['refresh'])

    def test_get_queryset(self):
        qs = TrackDocument().get_queryset()
        self.assertIsInstance(qs, models.QuerySet)
        self.assertEqual(qs.model, Track)

    def test_model_instance_iterable_update_with_pagination(self):

        class TrackDocument2(TrackDocument):
            class Meta:
                model = Track
                queryset_pagination = 2

        doc = TrackDocument2()
        track1 = Track(id=1)
        track2 = Track(id=2)
        track3 = Track(id=3)
        with patch('django_elasticsearch_dsl.documents.bulk') as mock:
            doc.update([track1, track2, track3])
            self.assertEqual(
                3, len(list(mock.call_args_list[0][1]['actions']))
            )

