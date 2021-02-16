DROP TABLE schedule;

CREATE TABLE schedule (user_id SERIAL PRIMARY KEY, user_name VARCHAR(50) NOT NULL, day NUMERIC(1) NOT NULL, start_time TIME NOT NULL, end_time TIME NOT NULL);
