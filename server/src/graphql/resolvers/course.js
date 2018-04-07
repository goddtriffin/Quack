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
		argSQL[0] = {name: "name", type: TYPES.NVarChar, arg: args.name};
        	return context.db.executeSQL("SELECT * FROM TestSchema.Courses where name = @name", argSQL, false);
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
	    	argSQL[0] = {name: 'id', type: TYPES.NVarChar, arg: args.input.id};
	    	argSQL[1] = {name: 'name', type: TYPES.NVarChar, arg: args.input.name};

		//console.log(argSQL);
		return context.db.executeSQL( 
		    "INSERT INTO TestSchema.Courses (id, name) OUTPUT " + 
		    "INSERTED.id, INSERTED.name " + 
		    "VALUES (@id, @name);", 
		    argSQL, false);
	}
    }
}
