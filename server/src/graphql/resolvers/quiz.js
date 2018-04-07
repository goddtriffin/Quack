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
		argSQL[1] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
		argSQL[2] = {name: 'date', type: TYPES.NVarChar, arg: args.input.date};
		argSQL[3] = {name: 'question', type: TYPES.NVarChar, arg: args.input.question};
		argSQL[4] = {name: 'image', type: TYPES.NVarChar, arg: args.input.image};
		argSQL[5] = {name: 'options', type: TYPES.NVarChar, arg: args.input.options};
		argSQL[6] = {name: 'correctAnswer', type: TYPES.NVarChar, arg: args.input.correctAnswer};
		argSQL[7] = {name: 'isOpen', type: TYPES.NVarChar, arg: (args.input.isOpen) ? 1 : 0};
		argSQL[8] = {name: 'isManual', type: TYPES.NVarChar, arg: (args.input.isManual) ? 1 : 0};

		//console.log(argSQL);
		return context.db.executeSQL( 
		    "INSERT INTO TestSchema.Quizzes (courseID, type, date, question, image, options, correctAnswer, isOpen, isManual) OUTPUT " + 
		    "INSERTED.id, INSERTED.courseID, INSERTED.type, INSERTED.date, INSERTED.question, INSERTED.image, INSERTED.options, INSERTED.correctAnswer, INSERTED.isOpen, INSERTED.isManual " + 
		    "VALUES (@courseID, @type, @date, @question, @image, @options, @correctAnswer, @isOpen, @isManual);", 
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
		argSQL[2] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
		argSQL[3] = {name: 'date', type: TYPES.NVarChar, arg: args.input.date};
		argSQL[4] = {name: 'question', type: TYPES.NVarChar, arg: args.input.question};
		argSQL[5] = {name: 'image', type: TYPES.NVarChar, arg: args.input.image};
		argSQL[6] = {name: 'options', type: TYPES.NVarChar, arg: args.input.options};
		argSQL[7] = {name: 'correctAnswer', type: TYPES.NVarChar, arg: args.input.correctAnswer};
		argSQL[8] = {name: 'isOpen', type: TYPES.NVarChar, arg: (args.input.isOpen) ? 1 : 0};
		argSQL[9] = {name: 'isManual', type: TYPES.NVarChar, arg: (args.input.isManual) ? 1 : 0};
		

		//console.log(argSQL);
		return context.db.executeSQL( 
		    "UPDATE TestSchema.Quizzes SET " + 
		     "courseID=@courseID, type=@type, date=@date, question=@question, image=@image, options=@options, correctAnswer=@correctAnswer, isOpen=@isOpen, isManual=@isManual  " + 
		     "OUTPUT INSERTED.id, INSERTED.courseID, INSERTED.type, INSERTED.date, INSERTED.question, INSERTED.image, INSERTED.options, INSERTED.correctAnswer, INSERTED.isOpen, INSERTED.isManual  WHERE id = @id;", 
		    argSQL, false);
    	}
    }
}
