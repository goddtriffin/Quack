import { validate_section_name } from '../validators/validate'
import jwt from 'jsonwebtoken';

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


export default {

    // Query //

    sections: async (args, context) => {
	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
    		argSQL = {};
        	return context.db.executeSQL("SELECT * FROM TestSchema.Sections", argSQL, true);
    	}
    },


    section: async (args, context) => {
	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }	
		// make sure Role with given id actually exists
		argSQL = {}

		argSQL[0] = {name: "id", type: TYPES.NVarChar, arg: args.id};
		return context.db.executeSQL("SELECT * FROM TestSchema.Sections where id = @id", argSQL, false);
    	}
    },

    // Mutation //

    sectionCreate: async (args, context) => {
	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
		argSQL = {};
		argSQL[0] = {name: 'courseID', type: TYPES.NVarChar, arg: args.input.courseID};
		argSQL[1] = {name: 'name', type: TYPES.NVarChar, arg: args.input.name};

		//console.log(argSQL);
		return context.db.executeSQL( 
		    "INSERT INTO TestSchema.Sections (courseID, name) OUTPUT " + 
		    "INSERTED.id, INSERTED.courseID, INSERTED.name " + 
		    "VALUES (@courseID, @name);", 
		    argSQL, false);
   	} 
   }, 

   sectionUpdate: async (args, context) => {
	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
		argSQL = {};
		argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
		argSQL[1] = {name: 'courseID', type: TYPES.NVarChar, arg: args.input.courseID};
		argSQL[2] = {name: 'name', type: TYPES.NVarChar, arg: args.input.name};

		//console.log(argSQL);
		return context.db.executeSQL( 
		    "UPDATE TestSchema.Sections SET " + 
			"courseID=@courseID, name=@name " + 
			"OUTPUT INSERTED.id, INSERTED.courseID, INSERTED.name WHERE id = @id;", 
		    argSQL, false);
    	}
    },
    sectionGetUsers: async(args, context) => {
        if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }

                argSQL = {}
                argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
                return context.db.executeSQL("SELECT c.id, * FROM TestSchema.UsersSections sc " + 
  			"INNER JOIN TestSchema.Users c ON c.id = sc.u_id WHERE sc.s_id = @id;", argSQL, true);
        }
    },
}
