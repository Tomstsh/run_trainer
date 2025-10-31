FROM python:3.14.0-slim-bookworm

RUN apt-get -y update; apt-get -y install curl

RUN python -m pip install --upgrade pip

RUN pip install django

WORKDIR /app

CMD ["tail", "-f", "/dev/null"]