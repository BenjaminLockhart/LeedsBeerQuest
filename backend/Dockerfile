FROM postgres:alpine

USER postgres

#Schema
COPY ./docker/postgres /
COPY ./docker/postgres/init-postgres.sql /docker-entrypoint-initdb.d/

#Data
COPY ./docker/postgres/leedsbeerquest.csv /docker-entrypoint-initdb.d/
