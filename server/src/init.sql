SELECT * FROM TestSchema.Users;

CREATE TABLE TestSchema.Grades (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	questionID INT,
	answerID INT,
	userID INT,
	points FLOAT,
	totalPoints FLOAT
)

/*DROP TABLE TestSchema.Quizzes;
CREATE TABLE TestSchema.Quizzes (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        courseID INT,
        date NVARCHAR(10),
        isOpen BIT,
);
CREATE TABLE TestSchema.Questions (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	quizID INT,
	type NVARCHAR(5),
	question NVARCHAR(1000),
	image NVARCHAR(1000),
	options NVARCHAR(1000),
	correctAnswer NVARCHAR(1000),
	isManual BIT
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

/*DROP TABLE TestSchema.Courses;

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
*/


