var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


export default {

    // Query //

    sections: (args, context) => {

    	argSQL = {};
        return context.db.executeSQL("SELECT * FROM TestSchema.Sections", argSQL, true);
    },


    section: (args, context) => {
        // make sure Role with given id actually exists
        argSQL = {}

        argSQL[0] = {name: "id", type: TYPES.NVarChar, arg: args.id};
        return context.db.executeSQL("SELECT * FROM TestSchema.Sections where id = @id", argSQL, false);
    },

    // Mutation //

    sectionCreate: (args, context) => {
        // (TEMPORARY FIX) use fakeDatabase's size to create initial id

        // update database with new User (potentially async task)

        // return newly created User to client
        argSQL = {};
        argSQL[0] = {name: 'courseID', type: TYPES.NVarChar, arg: args.input.courseID};
        argSQL[1] = {name: 'name', type: TYPES.NVarChar, arg: args.input.name};

        //console.log(argSQL);
        return context.db.executeSQL( 
            "INSERT INTO TestSchema.Sections (courseID, name) OUTPUT " + 
            "INSERTED.id, INSERTED.courseID, INSERTED.name " + 
            "VALUES (@courseID, @name);", 
            argSQL, false);
    }, 

   sectionUpdate: (args, context) => {

        // update database with new User (potentially async task)

        // return newly created User to client
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
}