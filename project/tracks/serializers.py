from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from project.tracks.documents import TrackDocument
from rest_framework import serializers


class GenreSerializer(serializers.Serializer):
    name = serializers.CharField()

    class Meta(object):
        fields = ('name',)
        read_only_fields = ('name',)


class TrackSerializer(serializers.Serializer):
    # id = serializers.SerializerMethodField()

    genres = serializers.SerializerMethodField(read_only=True)
    artist_name = serializers.CharField(read_only=True)
    track_name = serializers.CharField(read_only=True)
    track_id = serializers.CharField(read_only=True)
    tempo = serializers.IntegerField(read_only=True)

    class Meta:
        document = TrackDocument
        fields = (
            # 'id',
            'genres',
            'artist_name',
            'track_name',
            'track_id',
            'tempo'
        )


    def get_genres(self, obj):
        if obj.genres:
            return list(obj.genres)
        else:
            return []



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

