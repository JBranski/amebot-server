DROP TABLE IF EXISTS requests;

CREATE TABLE requests (
	id INTEGER primary key generated by default as identity,
	name TEXT,
	command TEXT,
	comresponse TEXT
);