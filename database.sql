CREATE DATABASE periodic_table;

CREATE TABLE elements(
    elements_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE DATABASE chemcards;

CREATE TABLE qanda( 
    qanda_id SERIAL PRIMARY KEY, 
    term VARCHAR(255)
);