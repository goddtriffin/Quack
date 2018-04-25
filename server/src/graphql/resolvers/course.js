import { validate_course_name } from '../validators/validate'
import jwt from 'jsonwebtoken';

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


export default {
    courses: async (args, context) => {
        if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
		return context.db.executeSQL("SELECT * FROM TestSchema.Courses", argSQL, true);
    	}
    },
    course: async (args, context) => {
    	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
		argSQL[0] = {name: "id", type: TYPES.NVarChar, arg: args.id};
        	return context.db.executeSQL("SELECT * FROM TestSchema.Courses where id = @id", argSQL, false);
   	}
    },

    //    MUTATIONS     //
    courseCreate: async (args, context) => {
	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }

		argSQL = {};
                argSQL[0] = {name: 'type', type: TYPES.NVarChar, arg: "instructor"};
                argSQL[1] = {name: 'courseID', type: TYPES.Int, arg: args.input.courseID};
                argSQL[2] = {name: 'userID', type: TYPES.Int, arg: args.input.userID};


                //console.log(argSQL);
                await context.db.executeSQL(
                    "INSERT INTO TestSchema.Roles (type, courseID, userID) OUTPUT " +
                     "INSERTED.id, INSERTED.type, INSERTED.courseID, INSERTED.userID VALUES (@type, @courseID, @userID);",
                    argSQL, false);

	    	argSQL = {};
	    	argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.input.courseID};
	    	argSQL[1] = {name: 'name', type: TYPES.NVarChar, arg: args.input.name};
		argSQL[2] = {name: 'description', type: TYPES.NVarChar, arg: args.input.description};
		//console.log(argSQL);
		return context.db.executeSQL( 
		    "INSERT INTO TestSchema.Courses (id, name, description) OUTPUT " + 
		    "INSERTED.id, INSERTED.name, INSERTED.description " + 
		    "VALUES (@id, @name, @description);", 
		    argSQL, false);
	}
    },
    courseGetUsers: async (args, context) => {
        if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
                argSQL[0] = {name: "id", type: TYPES.Int, arg: args.id};
       		return context.db.executeSQL("SELECT c.id, * FROM TestSchema.UsersCourses sc " +
                        "INNER JOIN TestSchema.Users c ON c.id = sc.s_id WHERE sc.c_id = @id;", argSQL, true);
	 }
    },
    courseGetQuizzes: async (args, context) => {
        if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
                argSQL[0] = {name: "id", type: TYPES.Int, arg: args.id};
		return context.db.executeSQL("SELECT * FROM TestSchema.Quizzes where courseID = @id", argSQL, true);
        }
    },
}
