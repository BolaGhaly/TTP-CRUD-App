CREATE DATABASE IF NOT EXISTS nba_players;

CREATE TABLE IF NOT EXISTS players(
  player_id SERIAL PRIMARY KEY,
  player_name VARCHAR(255),
  player_team VARCHAR(255),
  player_number int
);

CREATE TABLE IF NOT EXISTS login_info(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(20),
  email VARCHAR(255),
  password VARCHAR(255)
);