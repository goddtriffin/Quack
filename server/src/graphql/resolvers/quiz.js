import { validate_quiz_type, validate_quiz_question, validate_quiz_options, validate_quiz_correct_answer, validate_date } from '../validators/validate'
import jwt from 'jsonwebtoken';

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


/*
 *Different types of quizzes: multiple-choice, short-answer, true-false
 *Date format: "MMDDYYYY"
 *image: default "image"
 */

export default {

    // Query //

    quizzes: async (args, context) => {
	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
    		argSQL = {};
        	return context.db.executeSQL("SELECT * FROM TestSchema.Quizzes", argSQL, true);
	}
    },


    quiz: async (args, context) => {
       	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
		 // make sure Role with given id actually exists
		argSQL = {}

		argSQL[0] = {name: "id", type: TYPES.NVarChar, arg: args.id};
		return context.db.executeSQL("SELECT * FROM TestSchema.Quizzes where id = @id", argSQL, false);
	}
    },

    // Mutation //

    quizCreate: async (args, context) => {
	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }	
		argSQL = {};
		argSQL[0] = {name: 'courseID', type: TYPES.NVarChar, arg: args.input.courseID};
		argSQL[1] = {name: 'date', type: TYPES.NVarChar, arg: args.input.date};
		argSQL[2] = {name: 'isOpen', type: TYPES.NVarChar, arg: (args.input.isOpen) ? 1 : 0};

		// publish the change
		const payload = {
			quizOpened: {
				courseID: argSQL[0].arg,
				date: argSQL[1].arg,
				isOpen: argSQL[2].arg,
			}
		}

		// only pub if quiz is open
		if (payload.quizOpened.isOpen) {
			context.pubsub.publish('quizOpened', payload);
		}

		//console.log(argSQL);
		return context.db.executeSQL( 
		    "INSERT INTO TestSchema.Quizzes (courseID, date, isOpen) OUTPUT " + 
		    "INSERTED.id, INSERTED.courseID, INSERTED.date, INSERTED.isOpen " + 
		    "VALUES (@courseID, @date, @isOpen);", 
		    argSQL, false);
	}
    }, 

    quizUpdate: async (args, context) => {
	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
		// update database of existing Role (async task)

		// return newly created User to client
		argSQL = {};
		argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
		argSQL[1] = {name: 'courseID', type: TYPES.NVarChar, arg: args.input.courseID};
		argSQL[2] = {name: 'date', type: TYPES.NVarChar, arg: args.input.date};
		argSQL[3] = {name: 'isOpen', type: TYPES.NVarChar, arg: (args.input.isOpen) ? 1 : 0};

		// publish the change
		const payload = {
			quizOpened: {
				courseID: argSQL[0].arg,
				date: argSQL[1].arg,
				isOpen: argSQL[2].arg,
			}
		}

		// only pub if quiz is open
		if (payload.quizOpened.isOpen) {
			context.pubsub.publish('quizOpened', payload);
		}
		

		//console.log(argSQL);
		return context.db.executeSQL( 
		    "UPDATE TestSchema.Quizzes SET " + 
		     "courseID=@courseID,  date=@date, isOpen=@isOpen " + 
		     "OUTPUT INSERTED.id, INSERTED.courseID, INSERTED.date, INSERTED.isOpen WHERE id = @id;", 
		    argSQL, false);
    	}
    },

        // Subscription

	quizOpened: {
		subscribe: withFilter(() => pubsub.asyncIterator('quizOpened'), (payload, variables) => {
			return payload.quizOpened.courseID === variables.courseID;
		}),
	}
}
