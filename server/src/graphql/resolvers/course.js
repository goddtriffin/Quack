var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


export default {
    courses: () => {},
    course: (args, context) => {
    	argSQL[0] = {name: "name", type: TYPES.NVarChar, arg: args.name};
        return context.db.executeSQL("SELECT * FROM TestSchema.Courses where name = @name", argSQL, false);
    }
}