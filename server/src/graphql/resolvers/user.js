var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};

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


export default {
    // Query //

    users: (args, context) => {
        // Read all rows from table
        argSQL = {}
        //argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
        return context.db.executeSQL("SELECT * FROM TestSchema.Users", argSQL);

    },

    user: (args, context) => {
        // make sure User with given id actually exists

        argSQL = {}
        argSQL[0] = {name: "email", type: TYPES.NVarChar, arg: args.email};
        return context.db.executeSQL("SELECT * FROM TestSchema.Users where email = @email", argSQL);
    },
    
    // Mutation //

    userCreate: (args, context) => {
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

    userUpdate: (args, context) => {
        // make sure User with given id actually exists
        console.log("ARGUMENTS " + args.id);
        argSQL = {};
        argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
        argSQL[1] = {name: 'firstName', type: TYPES.NVarChar, arg: args.input.firstName};
        argSQL[2] = {name: 'lastName', type: TYPES.NVarChar, arg: args.input.lastName};
        argSQL[3] = {name: 'email', type: TYPES.NVarChar, arg: args.input.email};

        return context.db.executeSQL( 
            "UPDATE TestSchema.Users SET " + 
             "firstName = @firstName, lastName = @lastName, email = @email " + 
             "OUTPUT INSERTED.id, INSERTED.firstName, INSERTED.lastName, INSERTED.email WHERE id = @id;", 
            argSQL);
    },

    userAddCourse: (args, context) => {
        console.log(args.c_id);
        argSQL = {}
        argSQL[0] = {name: 's_id', type: TYPES.Int, arg: args.id};
        argSQL[1] = {name: 'c_id', type: TYPES.Int, arg: args.c_id};
        return context.db.executeSQL("if not exists (select * from TestSchema.UsersCourses d where d.s_id = @s_id and d.c_id = @c_id) " + 
            "INSERT INTO TestSchema.UsersCourses (s_id, c_id) VALUES (@s_id, @c_id) " + 
            "SELECT c.id, name FROM TestSchema.UsersCourses sc " +  
            "INNER JOIN TestSchema.Courses c ON c.id = sc.c_id WHERE sc.s_id = @s_id ", argSQL);
    },

    userGetCourses: (args, context) => {
        argSQL = {}
        argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
        return context.db.executeSQL("SELECT c.id, name FROM TestSchema.UsersCourses sc " + 
            "INNER JOIN TestSchema.Courses c ON c.id = sc.c_id WHERE sc.s_id = @id", argSQL);
    }
}