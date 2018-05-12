DELETE FROM TestSchema.Courses WHERE id=764741;
TRUNCATE TABLE TestSchema.Quizzes;
TRUNCATE TABLE TestSchema.Answers;
TRUNCATE TABLE TestSchema.Questions;
TRUNCATE TABLE TestSchema.Grades;
TRUNCATE TABLE TestSchema.Courses;
TRUNCATE TABLE TestSchema.UsersCourses;
TRUNCATE TABLE TestSchema.UsersSections;
TRUNCATE TABLE TestSchema.Roles;
TRUNCATE TABLE TestSchema.Users;

DROP TABLE TestSchema.Quizzes;
CREATE TABLE TestSchema.Quizzes (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        title NVARCHAR(60),
	courseID INT,
        qCount INT,
        date NVARCHAR(10),
        isOpen BIT,
);

DROP TABLE TestSchema.Answers;
CREATE TABLE TestSchema.Answers (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        userID INT,
        quizID INT,
	questionID INT,
        type NVARCHAR(50),
        content NVARCHAR(50)
);

SELECT * FROM TestSchema.Answers;

DROP TABLE TestSchema.Grades;

CREATE TABLE TestSchema.Grades (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        userID INT,
	quizID INT,
	questionID INT,
	answerID INT,
	points FLOAT,
	totalPoints FLOAT
)

CREATE TABLE TestSchema.Questions (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        quizID INT,
        qIndex INT,
        type NVARCHAR(5),
        question NVARCHAR(1000),
        image NVARCHAR(1000),
        options NVARCHAR(1000),
        correctAnswer NVARCHAR(1000),
        isManual BIT
);

CREATE TABLE TestSchema.UsersSections (
        u_id INT,
        s_id INT,

);

DROP TABLE TestSchema.Quizzes;
CREATE TABLE TestSchema.Quizzes (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        courseID INT,
        qCount INT,
	date NVARCHAR(10),
        isOpen BIT,
);

DROP TABLE TestSchema.Courses;

CREATE TABLE TestSchema.Courses (
        id INT,
        name NVARCHAR(50),
	description NVARCHAR(3000)
);

DROP TABLE TestSchema.Feedback;

CREATE TABLE TestSchema.Feedbacks (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	userID INT,
	date NVARCHAR(10),
	content NVARCHAR(4000)

);

DROP TABLE TestSchema.Courses;

CREATE TABLE TestSchema.Courses (
        id INT,
        name NVARCHAR(50)
);

CREATE SCHEMA TestSchema;

CREATE DATABASE quackDB;

CREATE TABLE TestSchema.UsersCourses (
	s_id INT,
	c_id INT,

);

CREATE TABLE TestSchema.Quizzes (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	courseID INT,
	type NVARCHAR(50),
	date NVARCHAR(10),
	question NVARCHAR(1000),
	image NVARCHAR(1000),
	options NVARCHAR(1000),
	correctAnswer NVARCHAR(1000),
	isOpen BIT,
	isManual BIT
);

CREATE TABLE TestSchema.Users (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	firstName NVARCHAR(50),
	lastName NVARCHAR(50),
	email NVARCHAR(50),
	password NVARCHAR(60)
);

CREATE TABLE TestSchema.Courses (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	name NVARCHAR(50)
);

CREATE TABLE TestSchema.Sections (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	courseID INT,
	name NVARCHAR(50)
);

CREATE TABLE TestSchema.Answers (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	userID INT,
	quizID INT,
	type NVARCHAR(50),
	content NVARCHAR(50)
);

CREATE TABLE TestSchema.Roles (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	userID INT,
	courseID INT,
	type NVARCHAR(50)
);