import { validate_quiz_type, validate_quiz_question, validate_quiz_options, validate_quiz_correct_answer, validate_date } from '../validators/validate';
import quizSubscriptions from '../subscriptions/quiz';
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
		argSQL[0] = {name: 'title', type: TYPES.NVarChar, arg: args.input.title};
		argSQL[1] = {name: 'courseID', type: TYPES.Int, arg: args.input.courseID};
		argSQL[2] = {name: 'qCount', type: TYPES.Int, arg: args.input.qCount};
		argSQL[3] = {name: 'date', type: TYPES.NVarChar, arg: args.input.date};
		argSQL[4] = {name: 'isOpen', type: TYPES.NVarChar, arg: (args.input.isOpen) ? 1 : 0};

		//console.log(argSQL);
		return context.db.executeSQL( 
		    "INSERT INTO TestSchema.Quizzes (title, courseID, qCount, date, isOpen) OUTPUT " + 
		    "INSERTED.id, INSERTED.title, INSERTED.courseID, INSERTED.qCount, INSERTED.date, INSERTED.isOpen " + 
		    "VALUES (@title, @courseID, @qCount, @date, @isOpen);", 
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
		argSQL[1] = {name: 'title', type: TYPES.NVarChar, arg: args.input.title};
		argSQL[2] = {name: 'courseID', type: TYPES.NVarChar, arg: args.input.courseID};
		argSQL[3] = {name: 'qCount', type: TYPES.Int, arg: args.input.qCount};
		argSQL[4] = {name: 'date', type: TYPES.NVarChar, arg: args.input.date};
                argSQL[5] = {name: 'isOpen', type: TYPES.NVarChar, arg: (args.input.isOpen) ? 1 : 0};
                
                // send subscription
                const courseID = argSQL[1].arg;
                const quiz = {
                        id:             argSQL[0].arg,
			title: 		argSQL[1].arg,
                        courseID:       argSQL[2].arg,
			qCount:		argSQL[3].arg,
                        date:           argSQL[4].arg,
                        isOpen:         argSQL[5].arg
                };
                quizSubscriptions.sendQuizUpdateEvent(courseID, quiz);
		
		//console.log(argSQL);
		return context.db.executeSQL( 
		    "UPDATE TestSchema.Quizzes SET " + 
		     "title=@title, courseID=@courseID,  qCount=@qCount, date=@date, isOpen=@isOpen " + 
		     "OUTPUT INSERTED.id, INSERTED.title, INSERTED.courseID, INSERTED.qCount, INSERTED.date, INSERTED.isOpen WHERE id = @id;", 
		    argSQL, false);
    	}
    },
    quizGetQuestions: async (args, context) => {
        if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
                argSQL[0] = {name: "id", type: TYPES.Int, arg: args.id};
                return context.db.executeSQL("SELECT * FROM TestSchema.Questions where quizID = @id", argSQL, true);
        }
    },
    quizGetStats: async (args, context) => {
        if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
		argSQL = {};
      			
		argSQL[0] = {name: "id", type: TYPES.Int, arg: args.questionID};
		const question = await context.db.executeSQL("SELECT * FROM TestSchema.Questions where id = @id", argSQL, false);
		
		var options = question.options.split(";");
		var selections = [];
		console.log(options);
		for(var i = 0; i < options.length; i++) {
			argSQL[0] = {name: "content", type: TYPES.NVarChar, arg: options[i]};
			var selection = await context.db.executeSQL("SELECT COUNT(*) FROM TestSchema.Answers where content=@content", argSQL, false);
			selections.push(Object.values(selection)[0]);
		}

		return selections;
	}
    },
    quizGetGrades: async (args, context) => {
        if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
                argSQL[0] = {name: "id", type: TYPES.Int, arg: args.id};
                return context.db.executeSQL("SELECT * FROM TestSchema.Questions where quizID = @id", argSQL, true);
        }
    },
}
