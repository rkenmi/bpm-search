# Create your views here.
from django_elasticsearch_dsl_drf.constants import (
    LOOKUP_FILTER_RANGE,
    LOOKUP_QUERY_IN,
    LOOKUP_QUERY_GT,
    LOOKUP_QUERY_GTE,
    LOOKUP_QUERY_LT,
    LOOKUP_QUERY_LTE,
    LOOKUP_FILTER_TERMS, LOOKUP_FILTER_PREFIX, LOOKUP_FILTER_WILDCARD, LOOKUP_QUERY_EXCLUDE, SEPARATOR_LOOKUP_FILTER,
    LOOKUP_FILTER_TERM)
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
    DefaultOrderingFilterBackend,
    SearchFilterBackend,
    CompoundSearchFilterBackend)
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from rest_framework import viewsets

from project.tracks.documents import TrackDocument
from project.tracks.serializers import TrackDocumentSerializer, GenreSerializer
from project.tracks.models import Genre


class TrackViewSet(DocumentViewSet):
    document = TrackDocument
    serializer_class = TrackDocumentSerializer
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        CompoundSearchFilterBackend,
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
        'genres': {
            'field': 'genres',
            'lookups': [
                SEPARATOR_LOOKUP_FILTER,
                LOOKUP_FILTER_TERM,
                LOOKUP_FILTER_TERMS,
                LOOKUP_FILTER_PREFIX,
                LOOKUP_FILTER_WILDCARD,
                LOOKUP_QUERY_IN,
                LOOKUP_QUERY_EXCLUDE
            ]
        },
    }

    # Define ordering fields
    ordering_fields = {
        'tempo': 'tempo',
    }

    # Specify default ordering
    ordering = ('tempo',)


class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
