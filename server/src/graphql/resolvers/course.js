import { validate_course_name } from '../validators/validate'

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


export default {
    courses: (args, context) => {
        return context.db.executeSQL("SELECT * FROM TestSchema.Courses", argSQL, true);
    },
    course: (args, context) => {
    	argSQL[0] = {name: "name", type: TYPES.NVarChar, arg: args.name};
        return context.db.executeSQL("SELECT * FROM TestSchema.Courses where name = @name", argSQL, false);
    },

    //    MUTATIONS     //
    courseCreate: (args, context) => {

    argSQL = {};
    argSQL[0] = {name: 'id', type: TYPES.NVarChar, arg: args.input.id};
    argSQL[1] = {name: 'name', type: TYPES.NVarChar, arg: args.input.name};

        //console.log(argSQL);
        return context.db.executeSQL( 
            "INSERT INTO TestSchema.Courses (id, name) OUTPUT " + 
            "INSERTED.id, INSERTED.name " + 
            "VALUES (@id, @name);", 
            argSQL, false);}
}
