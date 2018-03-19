var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


export default {

    // Query //

    quizzes: (args, context) => {

    	argSQL = {};
        return context.db.executeSQL("SELECT * FROM TestSchema.Quizzes", argSQL, true);
    },


    quiz: (args, context) => {
        // make sure Role with given id actually exists
        argSQL = {}

        argSQL[0] = {name: "id", type: TYPES.NVarChar, arg: args.id};
        return context.db.executeSQL("SELECT * FROM TestSchema.Quizzes where id = @id", argSQL, false);
    },

    // Mutation //

    quizCreate: (args, context) => {
        // (TEMPORARY FIX) use fakeDatabase's size to create initial id

        // update database with new User (potentially async task)

        // return newly created User to client
        argSQL = {};
        argSQL[0] = {name: 'sectionID', type: TYPES.NVarChar, arg: args.input.sectionID};
        argSQL[1] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
        argSQL[2] = {name: 'date', type: TYPES.NVarChar, arg: args.input.date};
        argSQL[3] = {name: 'correctAnswer', type: TYPES.NVarChar, arg: args.input.correctAnswer};
        argSQL[4] = {name: 'isOpen', type: TYPES.NVarChar, arg: (args.input.isOpen) ? 1 : 0};
        argSQL[5] = {name: 'isManual', type: TYPES.NVarChar, arg: (args.input.isManual) ? 1 : 0};

        //console.log(argSQL);
        return context.db.executeSQL( 
            "INSERT INTO TestSchema.Quizzes (sectionID, type, date, correctAnswer, isOpen, isManual) OUTPUT " + 
            "INSERTED.id, INSERTED.sectionID, INSERTED.type, INSERTED.date, INSERTED.correctAnswer, INSERTED.isOpen, INSERTED.isManual " + 
            "VALUES (@sectionID, @type, @date, @correctAnswer, @isOpen, @isManual);", 
            argSQL, false);
    }, 

    quizUpdate: (args, context) => {

        // update database of existing Role (async task)

        // return newly created User to client
        argSQL = {};
        argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
        argSQL[1] = {name: 'sectionID', type: TYPES.NVarChar, arg: args.input.sectionID};
        argSQL[2] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
        argSQL[3] = {name: 'date', type: TYPES.NVarChar, arg: args.input.date};
        argSQL[4] = {name: 'correctAnswer', type: TYPES.NVarChar, arg: args.input.correctAnswer};
        argSQL[5] = {name: 'isOpen', type: TYPES.NVarChar, arg: (args.input.isOpen) ? 1 : 0};
        argSQL[6] = {name: 'isManual', type: TYPES.NVarChar, arg: (args.input.isManual) ? 1 : 0};
        

        //console.log(argSQL);
        return context.db.executeSQL( 
            "UPDATE TestSchema.Quizzes SET " + 
             "sectionID=@sectionID, type=@type, date=@date, correctAnswer=@correctAnswer, isOpen=@isOpen, isManual=@isManual  " + 
             "OUTPUT INSERTED.id, INSERTED.sectionID, INSERTED.type, INSERTED.date, INSERTED.correctAnswer, INSERTED.isOpen, INSERTED.isManual  WHERE id = @id;", 
            argSQL, false);
    }
}