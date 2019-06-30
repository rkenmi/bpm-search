from elasticsearch_dsl import analyzer

from django_elasticsearch_dsl import DocType, Index, fields

from project.tracks.models import Track

tracks_index = Index('tracks')
tracks_index.settings(
    number_of_shards=1,
    number_of_replicas=1
)

html_strip = analyzer('html_strip',
    tokenizer="standard",
    filter=["standard", "lowercase", "stop", "snowball"],
    char_filter=["html_strip"]
)


@tracks_index.doc_type
class TrackDocument(DocType):
    id = fields.IntegerField(attr='id')
    genres = fields.TextField(
        attr='genres_indexing',
        analyzer='keyword',
        multi=True
    )
    artist_name = fields.TextField()
    duration_ms = fields.LongField()
    track_name = fields.TextField(
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword'),
        }
    )
    track_id = fields.TextField()
    tempo = fields.IntegerField()

    class Meta(object):
        model = Track
