from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from project.tracks.documents import TrackDocument


class TrackDocumentSerializer(DocumentSerializer):
    class Meta:
        document = TrackDocument
        fields = (
            'id',
            'genre',
            'artist_name',
            'track_name',
            'track_id',
            'tempo'
        )
