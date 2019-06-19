from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from project.tracks.documents import TrackDocument
from rest_framework import serializers


class GenreSerializer(serializers.Serializer):
    name = serializers.CharField()

    class Meta(object):
        fields = ('name',)
        read_only_fields = ('name',)


class TrackDocumentSerializer(DocumentSerializer):
    class Meta:
        document = TrackDocument
        fields = (
            'id',
            'genres',
            'artist_name',
            'track_name',
            'track_id',
            'tempo'
        )

