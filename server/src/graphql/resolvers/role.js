import { validate_role_type } from '../validators/validate'

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


export default {

    // Query //

    roles: (args, context) => {

    	argSQL = {};
        return context.db.executeSQL("SELECT * FROM TestSchema.Roles", argSQL, true);
    },

    role: (args, context) => {
        // make sure Role with given id actually exists

        argSQL = {}
        argSQL[0] = {name: "id", type: TYPES.NVarChar, arg: args.id};
        return context.db.executeSQL("SELECT * FROM TestSchema.Roles where id = @id", argSQL, false);
    },

    // Mutation //

    roleCreate: (args, context) => {
        // validate all user input
        // validate_role_type(args.input.type);

        // (TEMPORARY FIX) use fakeDatabase's size to create initial id

        // update database with new User (potentially async task)

        // return newly created User to client
        argSQL = {};
        argSQL[0] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
        argSQL[1] = {name: 'courseID', type: TYPES.NVarChar, arg: args.input.courseID};
        argSQL[2] = {name: 'userID', type: TYPES.NVarChar, arg: args.input.userID};
        

        //console.log(argSQL);
        return context.db.executeSQL( 
            "INSERT INTO TestSchema.Roles (type, courseID, userID) OUTPUT " + 
             "INSERTED.id, INSERTED.type, INSERTED.courseID, INSERTED.userID VALUES (@type, @courseID, @userID);", 
            argSQL, false);
    },

    roleUpdate: (args, context) => {
        // validate_role_type(args.input.type);

        // update database of existing Role (async task)

        // return newly created User to client
        argSQL = {};
        argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
        argSQL[1] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
        argSQL[2] = {name: 'courseID', type: TYPES.NVarChar, arg: args.input.courseID};
        argSQL[3] = {name: 'userID', type: TYPES.NVarChar, arg: args.input.userID};
        

        //console.log(argSQL);
        return context.db.executeSQL( 
            "UPDATE TestSchema.Roles SET " + 
             "type = @type, courseID = @courseID, userID = @userID " + 
             "OUTPUT INSERTED.id, INSERTED.type, INSERTED.courseID, INSERTED.userID WHERE id = @id;", 
            argSQL, false);
    }

}