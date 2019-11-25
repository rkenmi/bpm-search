import os
import pytest
import logging

from elasticsearch.helpers.test import get_test_client
from elasticsearch_dsl import connections

logger = logging.getLogger(__name__)

def pytest_configure():
    import django
    from django.conf import settings
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    DJANGO_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
    )

    THIRD_PARTY_APPS = (
        'rest_framework',
        'rest_framework.authtoken',
        'django_elasticsearch_dsl',
        'django_elasticsearch_dsl_drf',
    )

    LOCAL_APPS = (
        'project.core',
        'project.api',
        'project.tracks',
    )

    server = os.environ.get('TEST_ES_SERVER', 'elasticsearch:9200')
    settings.configure(
        SITE_ID=1,
        SECRET_KEY='not very secret in tests',
        ROOT_URLCONF='tests.urls',
        TEMPLATES=[
            {
                'BACKEND': 'django.template.backends.django.DjangoTemplates',
                'APP_DIRS': True,
                'OPTIONS': {
                    "debug": True,  # We want template errors to raise
                }
            },
        ],
        ALLOWED_HOSTS=['localhost', 'elasticsearch'],
        ES_CLIENT=connections.create_connection(hosts=[server], timeout=5),
        INSTALLED_APPS=DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS,
        LOGGING = {
            'version': 1,
            'disable_existing_loggers': False,
            'handlers': {
                'console': {
                    'class': 'logging.StreamHandler',
                },
            },
            'loggers': {
                'django': {
                    'handlers': ['console'],
                    'level': 'DEBUG',
                    'propagate': True,
                },
            },
        },
        DATABASES={
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
            }
        },
        ELASTICSEARCH_DSL={
            'default': {
                'hosts': server
            }
        }
    )

    django.setup()


@pytest.fixture(scope='session')
def es_client():
    """Create and return elasticsearch connection"""
    # connection = Elasticsearch([os.environ.get('TEST_ES_SERVER', 'localhost')])
    logger.info("Creating test ES client")
    connection = get_test_client(nowait='WAIT_FOR_ES' not in os.environ)
    connections.add_connection('default', connection)
    return connection


DATA = [{'_source': {'duration_ms': 490867, 'tempo': 86, 'artist_name': 'Giuseppe Verdi',
                     'track_id': '7EsKYeHtTc4H4xWiTqSVZA',
                     'track_name': 'Stiffelio, Act III: Ei fugge! … Lina, pensai che un angelo … Oh gioia inesprimbile',
                     'genres': ['Opera'], 'id': 1}, '_type': 'doc', '_id': '1', '_index': 'tracks', '_score': 1.0}, {
            '_source': {'duration_ms': 176797, 'tempo': 131, 'artist_name': 'Giacomo Puccini',
                        'track_id': '7MfmRBvqaW0I6UTxXnad8p',
                        'track_name': 'Madama Butterfly / Act 1: ... E soffitto e pareti', 'genres': ['Opera'],
                        'id': 2}, '_type': 'doc', '_id': '2', '_index': 'tracks', '_score': 1.0}, {
            '_source': {'duration_ms': 266184, 'tempo': 75, 'artist_name': 'Giacomo Puccini',
                        'track_id': '7pBo1GDhIysyUMFXiDVoON',
                        'track_name': 'Turandot / Act 2: Gloria, gloria, o vincitore', 'genres': ['Opera'], 'id': 3},
            '_type': 'doc', '_id': '3', '_index': 'tracks', '_score': 1.0}, {
            '_source': {'duration_ms': 288573, 'tempo': 76, 'artist_name': 'Giuseppe Verdi',
                        'track_id': '02mvYZX5aKNzdqEo6jF20m',
                        'track_name': 'Rigoletto, Act IV: Venti scudi hai tu detto?', 'genres': ['Opera'], 'id': 4},
            '_type': 'doc', '_id': '4', '_index': 'tracks', '_score': 1.0}, {
            '_source': {'duration_ms': 629760, 'tempo': 172, 'artist_name': 'Giuseppe Verdi',
                        'track_id': '03TW0jwGMGhUabAjOpB1T9', 'track_name': 'Don Carlo / Act 4: "Ella giammai m\'amò!"',
                        'genres': ['Opera'], 'id': 5}, '_type': 'doc', '_id': '5', '_index': 'tracks', '_score': 1.0}, {
            '_source': {'duration_ms': 334720, 'tempo': 81, 'artist_name': 'Giuseppe Verdi',
                        'track_id': '0G75cCcf6vBSnMFFkVW9pq', 'track_name': "D'amor sull'ali rosee",
                        'genres': ['Opera'], 'id': 6}, '_type': 'doc', '_id': '6', '_index': 'tracks', '_score': 1.0}, {
            '_source': {'duration_ms': 646813, 'tempo': 171, 'artist_name': 'Georges Bizet',
                        'track_id': '10gPtjlpTS9Uq6EUQuGljt', 'track_name': 'Waxman : Carmen Fantasie',
                        'genres': ['Opera'], 'id': 7}, '_type': 'doc', '_id': '7', '_index': 'tracks', '_score': 1.0}, {
            '_source': {'duration_ms': 963440, 'tempo': 82, 'artist_name': 'Giuseppe Verdi',
                        'track_id': '1iayQ9XmNJL2F0S0zjdNST', 'track_name': '4 Pezzi sacri: No. 4. Te Deum',
                        'genres': ['Opera'], 'id': 8}, '_type': 'doc', '_id': '8', '_index': 'tracks', '_score': 1.0}, {
            '_source': {'duration_ms': 417987, 'tempo': 65, 'artist_name': 'Vincenzo Bellini',
                        'track_id': '297JkKwa74ayxAz38hXMeb',
                        'track_name': 'I puritani: Ah! per sempre io ti perdei - Bel sogno beato (Live)',
                        'genres': ['Opera'], 'id': 9}, '_type': 'doc', '_id': '9', '_index': 'tracks', '_score': 1.0}, {
            '_source': {'duration_ms': 373480, 'tempo': 73, 'artist_name': 'Léo Delibes',
                        'track_id': '3Eu8Qqq7vv0UsNWf0mWTmZ',
                        'track_name': 'Lakmé, Act I, No. 2: Viens, Mallika... Sous le dôme épais ("Flower Duet")',
                        'genres': ['Opera'], 'id': 10}, '_type': 'doc', '_id': '10', '_index': 'tracks', '_score': 1.0}]
