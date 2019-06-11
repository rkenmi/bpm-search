# Create your views here.
from django_elasticsearch_dsl_drf.constants import (
    LOOKUP_FILTER_RANGE,
    LOOKUP_QUERY_IN,
    LOOKUP_QUERY_GT,
    LOOKUP_QUERY_GTE,
    LOOKUP_QUERY_LT,
    LOOKUP_QUERY_LTE,
)
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
    DefaultOrderingFilterBackend,
    SearchFilterBackend,
)
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet

from project.tracks.documents import TrackDocument
from project.tracks.serializers import TrackDocumentSerializer


class TrackViewSet(DocumentViewSet):
    document = TrackDocument
    serializer_class = TrackDocumentSerializer
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
    ]

    # Define search fields
    search_fields = (
        'track_name',
        'tempo',
    )

    # Filter fields
    filter_fields = {
        'track_name': 'track_name.raw',
        'track_id': 'track_id',
        'tempo': {
            'field': 'tempo',
            'lookups': [
                LOOKUP_FILTER_RANGE,
                LOOKUP_QUERY_IN,
                LOOKUP_QUERY_GT,
                LOOKUP_QUERY_GTE,
                LOOKUP_QUERY_LT,
                LOOKUP_QUERY_LTE,
            ],
        },
    }

    # Define ordering fields
    ordering_fields = {
        # 'track_name': 'track_name.raw',
        'tempo': 'tempo',
    }

    # Specify default ordering
    ordering = ('tempo',)
