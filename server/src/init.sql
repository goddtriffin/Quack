/*CREATE SCHEMA TestSchema

DELETE FROM TestSchema.Users where firstName IS NULL;

SELECT * FROM TestSchema.Users;

CREATE TABLE TestSchema.UsersCourses (
	s_id INT,
	c_id INT,
);*/

/*INSERT INTO TestSchema.UsersCourses (s_id, c_id) VALUES 
	(1, 3);*/

/*SELECT * FROM TestSchema.UsersCourses;*/

/*(SELECT 'User' as u, id, firstName, lastName FROM TestSchema.Users)

UNION

(SELECT 'Course' as c, id, name FROM TestSchema.Courses)*/

/*SELECT * FROM TestSchema.Roles;*/

/*DELETE FROM TestSchema.Roles where userID IS NULL*/

/*CREATE TABLE TestSchema.Quizzes (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	sectionID INT,
	type NVARCHAR(50),
	date NVARCHAR(10),
	correctAnswer NVARCHAR(1000),
	isOpen BIT,
	isManual BIT
);*/

/*INSERT INTO TestSchema.Quizzes (sectionID, type, date, correctAnswer, isOpen, isManual) VALUES 
	(1, 'short-answer', '1998-04-05', 'blahblahblah', 0, 1);*/

/*SELECT * FROM TestSchema.Quizzes;*/

DROP TABLE TestSchema.Sections;
CREATE TABLE TestSchema.Sections (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	courseID INT,
	name NVARCHAR(50)
);


