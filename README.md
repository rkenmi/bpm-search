# BPM Search Engine
A Django + React + Elasticsearch Application.

# Requirements
- npm: Tested with 5.5.1
- Python 3.5.1: pyenv or virtualenv is recommended to isolate Python environments)
- SQLite 3: default database that Django uses. On MacOS, Python 3.5.1 may need to be compiled with SQLite 3 support. For this reason, use of Docker is recommended.
- Elasticsearch: search engine for data

# Local Development
Instructions for manual and Docker development

## Docker + ElasticSearch (Recommended)
1. Run `docker-compose up --build`
2. Spin up the react-dev-webserver with `npm run dev` to load front-end assets

## Manual
1. Run `npm install`
2. Run `pip install -r requirements.txt`
3. Spin up the Django server with `python manage.py runserver`
4. Spin up the react-dev-webserver with `npm run dev` to load front-end assets
5. Spin up a local Elasticsearch server on port 9200

