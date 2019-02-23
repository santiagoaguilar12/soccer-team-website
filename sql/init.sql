DROP DATABASE If EXISTS  soccer_site ;

CREATE DATABASE soccer_site;

USE soccer_site;

CREATE TABLE players(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birthday DATE,
    positon VARCHAR(100),
    team VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) DEFAULT "assets/images/default.png"
    
);

INSERT INTO players (first_name, last_name,birthday,positon,team) VALUES  
("Santiago", "Aguilar", "2000-03-04", "Midfielder","U21 Boys"),
("Christian", "Aguilar", "2003-10-10", "Midfielder","U17 Boys");




CREATE TABLE coaches(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birthday DATE,
    team VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    image_url VARCHAR(255) DEFAULT "assets/images/default.png"

    
);

INSERT INTO coaches (first_name, last_name,birthday,team, title) VALUES  
("Junior", "Groves", "1970-11-24", "U21 Boys","Head Coach"),
("Franco", "Iabone", "1975-05-17", "U18 Boys","Assistant Coach");



SELECT * FROM players;
SELECT * FROM coaches;