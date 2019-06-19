# BPM Search Engine
A Django + React + Elasticsearch application that allows you to search music tracks by BPM and Genres.

# Requirements
- npm: 5.5.1+
- Docker
- Docker Compose

or without Docker:
- Python 3.5.1: pyenv or virtualenv is recommended to isolate Python environments)
- SQLite 3: default database that Django uses. On MacOS, Python 3.5.1 may need to be compiled with SQLite 3 support. For this reason, use of Docker is recommended.
- Elasticsearch: search engine for data

# Local Development
Instructions for manual and Docker development

## Docker + Elasticsearch
1. Run `docker-compose up --build`. The server runs on port 8000 by default.
2. Create the DB schema with `docker exec -it python manage.py makemigrations`
3. Migrate the schema with `docker exec -it python manage.py migrate`
4. Create elasticsearch indices with `docker exec -it python manage.py search_index --rebuild`
5. Spin up the react-dev-webserver with `npm run dev` to route front-end assets to port 8000.

