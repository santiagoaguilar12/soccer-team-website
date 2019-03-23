DROP DATABASE If EXISTS  soccer_site ;

CREATE DATABASE soccer_site;

USE soccer_site;

CREATE TABLE persons(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) DEFAULT "/images/default.jpg",
    role VARCHAR(50) NOT NULL,
    gender VARCHAR(10),
    email VARCHAR(100),
    city VARCHAR(50),
    phone VARCHAR(15)
    
    
);

CREATE TABLE athletes(
    person_id INTEGER,
    birthday DATE,
    primary_position VARCHAR(100),
    secondary_position VARCHAR(100),
    team VARCHAR(100) NOT NULL,
    prefer_foot VARCHAR(10),
    height_in_m  DECIMAL(3,2) UNSIGNED,
    weight_in_kg  DECIMAL(3,1) UNSIGNED,
    jersey_num  INTEGER(3) UNSIGNED,
    video_url VARCHAR(500),
    profile_doc VARCHAR(255),
    FOREIGN KEY(person_id) REFERENCES persons(id)
    ON DELETE CASCADE

);


CREATE TABLE students(
    person_id INTEGER,
    school_type VARCHAR(255),
    school_name VARCHAR(255),
    grad_year YEAR,
    sat_score INTEGER(4),
    act_score INTEGER(2),
    gpa DECIMAL(2,1),
    FOREIGN KEY(person_id) REFERENCES persons(id)
    ON DELETE CASCADE
);

CREATE TABLE coaches(
    person_id INTEGER,
    role VARCHAR(50),
    team VARCHAR(100),
    FOREIGN KEY(person_id) REFERENCES persons(id)
    ON DELETE CASCADE
);

CREATE TABLE accomplishments(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    person_id INTEGER,
    name_acc VARCHAR(150),
    text_acc VARCHAR(255),
    date_acc YEAR,
    FOREIGN KEY(person_id) REFERENCES persons(id)
    ON DELETE CASCADE
);

INSERT INTO persons (first_name, last_name, role, gender, email, city, phone) VALUES
("Santiago", "Aguilar", "athlete", "Male","santiago2000aguilar@gmail.com", "Whitby", "2893146402"),
("Dina", "Daza", "athlete", "female","dina@gmail.com", "Whitby", "2893146402"),
("John", "Aguilar", "athlete", "Male","john@gmail.com", "Whitby", "2893146402"),
("Christian", "Aguilar", "athlete", "Male","christian@gmail.com", "Whitby", "2893146402"),
("Junior", "Groves", "coach", "Male","groves@gmail.com", "Pickering", "2893146402"),
("Franco", "Iabone", "coach", "Male","franco@gmail.com", "Whitby", "2893146402");

INSERT INTO athletes (person_id, birthday ,primary_position,team,video_url) VALUES  
("1", "2000-03-04", "Midfielder","U21 Boys","youtube.com"),
("4", "2003-10-10", "Midfielder","U17 Boys","youtube.com"),
("3", "1999-04-21", "Defender","U57 Boys","youtube.com"),
("2", "1039-10-10", "Goalkeeper","U17 Girls","youtube.com");

INSERT INTO students (person_id, school_type, grad_year, school_name) VALUES
("1", "University", "2023", "University of Waterloo"),
("4", "High School", "2021", "All Saints CSS");

INSERT INTO coaches (person_id, role, team) VALUES
("5", "Director", "Academy"),
("6", "Assistant Coach", "U21 Boys");

INSERT INTO accomplishments (person_id,name_acc, text_acc, date_acc) VALUES
("1","Honour Roll","Maintained an 80 average throughout high school","2018"),
("1","Math Council","Founded Math Council","2017"),
("5","Player of the Year","Was named player of the year in Jamaica","1970"),
("1","SAT Subject Test","Perfect Scores in Math II and Physics","2018");

SELECT * FROM persons;
