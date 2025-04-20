CREATE TABLE stations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL UNIQUE, -- Address is how we will identify stations.
    longitude FLOAT,
    latitude FLOAT,
    price DECIMAL(5,3) NOT NULL
);