SELECT * FROM TestSchema.Users;
/*DROP TABLE TestSchema.Courses;

CREATE TABLE TestSchema.Courses (
        id INT,
        name NVARCHAR(50)
);*/


/*CREATE SCHEMA TestSchema;

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


