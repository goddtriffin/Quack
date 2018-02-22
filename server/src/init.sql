/*CREATE SCHEMA TestSchema

CREATE TABLE TestSchema.Users (
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	firstName NVARCHAR(50),
	lastName NVARCHAR(50),
	email NVARCHAR(50)
);*/

DELETE FROM TestSchema.Users where firstName IS NULL;

SELECT * FROM TestSchema.Users;
