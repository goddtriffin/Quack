var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;

class User {
    constructor(id, {firstName, lastName, email}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.courses = [];
    }

    // addCourse () {}
}
var argSQL = {};


export default {
    // Query //

    users: (_, context) => {
        // Read all rows from table
        argSQL = {}
        return context.db.executeSQL("SELECT * FROM TestSchema.Users", argSQL);

    },

    user: (args, context) => {
        // make sure User with given id actually exists
        argSQL = {}
        argSQL[0] = {name: "id", type: TYPES.Int, args: arg.id};
        console.log(args.id);
        return context.db.executeSQL("SELECT * FROM TestSchema.Users where id = @id", argSQL);
    },
    
    // Mutation //

    createUser: (args, context) => {
        // (TEMPORARY FIX) use fakeDatabase's size to create initial id

        // update database with new User (potentially async task)

        // return newly created User to client
        argSQL = {};
        argSQL[0] = {name: 'firstName', type: TYPES.NVarChar, arg: args.input.firstName};
        argSQL[1] = {name: 'lastName', type: TYPES.NVarChar, arg: args.input.lastName};
        argSQL[2] = {name: 'email', type: TYPES.NVarChar, arg: args.input.email};

        //console.log(argSQL);
        return context.db.executeSQL( 
            "INSERT INTO TestSchema.Users (firstName, lastName, email) OUTPUT " + 
             "INSERTED.id, INSERTED.firstName, INSERTED.lastName, INSERTED.email VALUES (@firstName, @lastName, @email);", 
            argSQL);
    },

    updateUser: (args, context) => {
        // make sure User with given id actually exists
        console.log("ARGUMENTS " + args.id);
        argSQL = {};
        argSQL[0] = {name: "id", type: TYPES.Int, arg: args.id};
        argSQL[1] = {name: 'firstName', type: TYPES.NVarChar, arg: args.input.firstName};
        argSQL[2] = {name: 'lastName', type: TYPES.NVarChar, arg: args.input.lastName};
        argSQL[3] = {name: 'email', type: TYPES.NVarChar, arg: args.input.email};

        return context.db.executeSQL( 
            "UPDATE TestSchema.Users SET " + 
             "firstName = @firstName, lastName = @lastName, email = @email " + 
             "OUTPUT INSERTED.id, INSERTED.firstName, INSERTED.lastName, INSERTED.email WHERE id = @id;", 
            argSQL);
    }
}