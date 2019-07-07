FROM python:3.5.1
ENV PYTHONUNBUFFERED 1

# jessie is now EOL. Workaround fix
RUN sed -i '/jessie-updates/d' /etc/apt/sources.list

RUN apt-get update && apt-get install -y gettext

RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
WORKDIR /code
