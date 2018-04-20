import jwt from 'jsonwebtoken';

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};

export default {

    // Query //

    feedbacks: async (args, context) => {
        if (!context.headers.hasOwnProperty('authorization')) {
            return new Error("No authorization");
        } else {
            try {
                var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
            } catch(err) {
                return new Error(err);
            }

            argSQL = {};
            return context.db.executeSQL("SELECT * FROM TestSchema.Feedbacks", argSQL, true);
        }
    },

    feedback: async (args, context) => {
       	if (!context.headers.hasOwnProperty('authorization')) {
            return new Error("No authorization");
        } else {
            try {
                var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
            } catch(err) {
                return new Error(err);
            }

            argSQL = {}
            argSQL[0] = {name: "id", type: TYPES.NVarChar, arg: args.id};
            return context.db.executeSQL("SELECT * FROM TestSchema.Feedbacks where id = @id", argSQL, false);
	    }
    },

    // Mutation //

    feedbackCreate: async (args, context) => {
        if (!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        } else {
            try {
                var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
            } catch(err) {
                return new Error(err);
            }

            argSQL = {};
            argSQL[0] = {name: 'userID', type: TYPES.NVarChar, arg: args.input.userID};
            argSQL[1] = {name: 'content', type: TYPES.NVarChar, arg: args.input.content};
            argSQL[2] = {name: 'date', type: TYPES.NVarChar, arg: args.input.date};

            return context.db.executeSQL( 
                "INSERT INTO TestSchema.Feedbacks (userID, content, date) OUTPUT " + 
                "INSERTED.id, INSERTED.userID, INSERTED.content, INSERTED.date " + 
                "VALUES (@userID, @content, @date);", 
                argSQL, false
            );
        }
    }, 

    feedbackUpdate: async (args, context) => {
	    if (!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        } else {
            try {
                var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
            } catch(err) {
                return new Error(err);
            }

            argSQL = {};
            argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
            argSQL[1] = {name: 'userID', type: TYPES.NVarChar, arg: args.input.userID};
            argSQL[2] = {name: 'content', type: TYPES.NVarChar, arg: args.input.content};
            argSQL[3] = {name: 'date', type: TYPES.NVarChar, arg: args.input.date};
            
            return context.db.executeSQL( 
                "UPDATE TestSchema.Feedbacks SET " + 
                "userID=@userID, content=@content, date=@date " + 
                "OUTPUT INSERTED.id, INSERTED.userID, INSERTED.content, INSERTED.date WHERE id = @id;", 
                argSQL, false
            );
    	}
    }
}
