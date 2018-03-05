var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


export default {
    roles: () => {
    	argSQL = {}
        //argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
        return context.db.executeSQL("SELECT * FROM TestSchema.Roles", argSQL);
    },

    // Mutation //

    roleCreate: (args, context) => {
        // (TEMPORARY FIX) use fakeDatabase's size to create initial id

        // update database with new User (potentially async task)

        // return newly created User to client
        argSQL = {};
        argSQL[0] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
        argSQL[1] = {name: 'courseID', type: TYPES.NVarChar, arg: args.input.courseID};
        argSQL[2] = {name: 'userID', type: TYPES.NVarChar, arg: args.input.studentID};
        

        //console.log(argSQL);
        return context.db.executeSQL( 
            "INSERT INTO TestSchema.Roles (type, courseID, userID) OUTPUT " + 
             "INSERTED.id, INSERTED.type, INSERTED.courseID, INSERTED.userID VALUES (@type, @courseID, @userID);", 
            argSQL);
    },

}