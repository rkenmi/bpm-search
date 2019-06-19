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
    genres = fields.StringField(
        attr='genres_indexing',
        # analyzer=html_strip,
        analyzer='keyword',
        # fields={
        #     'raw': fields.StringField(analyzer='keyword', multi=True),
        # },
        multi=True
    )
    artist_name = fields.StringField()
    duration_ms = fields.LongField()
    track_name = fields.StringField(
        analyzer=html_strip,
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    track_id = fields.StringField()
    tempo = fields.IntegerField()

    class Meta(object):
        model = Track
