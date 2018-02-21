var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;

class User {
    constructor(id, {firstName, lastName, email, connection}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.connection = connection;
        this.courses = [];
    }

    // addCourse () {}
}
var argSQL = {};
var fakeDatabase = {};
fakeDatabase[0] = {id: 0, firstName: "Todd", lastName: "Griffin", email: "dad@dad.com", courses: []};
fakeDatabase[1] = {id: 1, firstName: "Justin", lastName: "Hartman", email: "dad@dad.com", courses: []};
fakeDatabase[2] = {id: 2, firstName: "Theo", lastName: "Burkhart", email: "dad@dad.com", courses: []};
fakeDatabase[3] = {id: 3, firstName: "Mason", lastName: "Wesolek", email: "dad@dad.com", courses: []};
fakeDatabase[4] = {id: 4, firstName: "Tyler", lastName: "Rex", email: "dad@dad.com", courses: []};

let executeSQL = (db, sqlString, args) => {
    return new Promise((resolve, reject) => {
        var request = new Request(sqlString, function(err, rowCount, rows) {
            
            if (err) {
                console.log(err);
            } else {
                //console.log(rowCount + ' rows');
                //console.log(rows);

                var jsonArray = [];
                rows.forEach(function (columns) {
                  var rowObject ={};
                  columns.forEach(function(column) {
                      rowObject[column.metadata.colName] = column.value;
                  });
                  jsonArray.push(rowObject)
                });


                console.log(jsonArray[0]);
                console.log(Object.keys(args).length);

                if(Object.keys(args).length > 0) {
                    console.log("sent first");
                    resolve(jsonArray[0]);
                }
                else {
                    console.log("sent all");
                    resolve(jsonArray);
                }
            }
        });

        for(let i = 0; i < Object.keys(args).length; i++) {
            request.addParameter(args[i].name, args[i].type, args[i].arg);
        }
        

        db.execSql(request);
    })
}

export default {
    // Query //

    users: (_, context) => {
        // Read all rows from table
        argSQL = {}
        return executeSQL(context.db, "SELECT * FROM TestSchema.Users", argSQL);

    },

    user: (args, context) => {
        // make sure User with given id actually exists
        argSQL = {}
        argSQL[0] = {name: "id", type: TYPES.Int, arg: args.id};
        console.log(args.id);
        return executeSQL(context.db, "SELECT * FROM TestSchema.Users where id = @id", argSQL);
    },
    
    // Mutation //

    createUser: ({input}) => {
        // (TEMPORARY FIX) use fakeDatabase's size to create initial id
        const id = Object.keys(fakeDatabase).length;

        // create new User
        const user = new User(id, input, email);

        // update database with new User (potentially async task)
        fakeDatabase[id] = user;

        // return newly created User to client
        return user;
    },

    updateUser: ({id, input}) => {
        // make sure User with given id actually exists
        if (!fakeDatabase[id]) {
            // User with id doesn't exist, throw error
            throw new Error("No user exists with id: " + id + ".");
        }

        // partially/fully update User
        Object.assign(fakeDatabase[id], input);
        
        // return updated User to client
        return fakeDatabase[id];
    }
}