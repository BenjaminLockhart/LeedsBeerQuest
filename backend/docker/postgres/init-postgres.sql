CREATE TABLE venues (
    name varchar(50) NOT NULL,
    category varchar(50) NOT NULL,
    url varchar(300) NOT NULL,
    date TIMESTAMP NOT NULL,
    excerpt text,
    thumbnail varchar(300),
    lat double PRECISION,
    lng double PRECISION,
    address varchar(200),
    phone varchar(20),
    twitter varchar(20),
    stars_beer double PRECISION,
    stars_atmosphere double PRECISION,
    stars_amenities double PRECISION,
    stars_value double PRECISION,
    tags text
);

CREATE INDEX idx_name ON venues (name DESC);

COPY venues(name, category, url, date, excerpt, thumbnail, lat, lng, address, phone, twitter, stars_beer, stars_atmosphere, stars_amenities, stars_value, tags) FROM '/docker-entrypoint-initdb.d/leedsbeerquest.csv' DELIMITER ',' CSV HEADER;