DROP TABLE IF EXISTS schedule;

CREATE TABLE IF NOT EXISTS schedule (user_id SERIAL PRIMARY KEY, user_name VARCHAR(50) NOT NULL, day NUMERIC(1) NOT NULL, start_time TIMESTAMPTZ NOT NULL, end_time TIMESTAMPTZ NOT NULL);
