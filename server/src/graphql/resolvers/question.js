import { validate_quiz_type, validate_quiz_question, validate_quiz_options, validate_quiz_correct_answer, validate_date } from '../validators/validate'
import jwt from 'jsonwebtoken';

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};

export default {
    // Query //

    questions: async (args, context) => {
        if (!context.headers.hasOwnProperty('authorization')) {
			return new Error("No authorization");
        }else {
			try {
				var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			} catch(err) {
				return new Error(err);
			}

			argSQL = {};

			return context.db.executeSQL("SELECT * FROM TestSchema.Questions", argSQL, true);
        }
    },

    question: async (args, context) => {
       	if (!context.headers.hasOwnProperty('authorization')) {
			return new Error("No authorization");
        } else {
			try {
				var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			} catch (err) {
				return new Error(err);
			}

			argSQL = {}
			argSQL[0] = {name: "id", type: TYPES.NVarChar, arg: args.id};

			return context.db.executeSQL("SELECT * FROM TestSchema.Questions where id = @id", argSQL, false);
		}
	},
	
	questionGetUserAnswer: async (args, context) => {
        if (!context.headers.hasOwnProperty('authorization')) {
			return new Error("No authorization");
        } else {
			try {
				var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			} catch (err) {
				return new Error(err);
			}
			
			argSQL = {};
			argSQL[0] = {name: 'q_id', type: TYPES.Int, arg: args.questionID};
			argSQL[1] = {name: 'u_id', type: TYPES.Int, arg: args.userID};
        	
			return context.db.executeSQL("SELECT * FROM TestSchema.Answers where quizID=@q_id and userID=@u_id;", argSQL, false);
		}
    },

    // Mutation //

    questionCreate: async (args, context) => {
		if (!context.headers.hasOwnProperty('authorization')) {
			return new Error("No authorization");
		} else {
			try {
				var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			} catch (err) {
				return new Error(err);
			}

			argSQL = {};
			argSQL[0] = {name: 'quizID', type: TYPES.Int, arg: args.input.quizID};
			argSQL[1] = {name: 'qIndex', type: TYPES.Int, arg: args.input.qIndex};
			argSQL[2] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
			argSQL[3] = {name: 'question', type: TYPES.NVarChar, arg: args.input.question};
			argSQL[4] = {name: 'image', type: TYPES.NVarChar, arg: args.input.image};
			argSQL[5] = {name: 'options', type: TYPES.NVarChar, arg: args.input.options};
			argSQL[6] = {name: 'correctAnswer', type: TYPES.NVarChar, arg: args.input.correctAnswer};
			argSQL[7] = {name: 'isManual', type: TYPES.Bit, arg: (args.input.isManual) ? 1 : 0};

			return context.db.executeSQL( 
					"INSERT INTO TestSchema.Questions (quizID, qIndex, type,  question, image, options, correctAnswer, isManual) OUTPUT " + 
					"INSERTED.id, INSERTED.quizID, INSERTED.qIndex, INSERTED.type, INSERTED.question, INSERTED.image, INSERTED.options, INSERTED.correctAnswer, INSERTED.isManual " + 
					"VALUES (@quizID, @qIndex, @type, @question, @image, @options, @correctAnswer,  @isManual);", 
					argSQL,
					false
				);
		}
    }, 

    questionUpdate: async (args, context) => {
		if (!context.headers.hasOwnProperty('authorization')) {
			return new Error("No authorization");
        } else {
			try {
				var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			} catch (err) {
				return new Error(err);
			}
			
			argSQL = {};
			argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
			argSQL[1] = {name: 'quizID', type: TYPES.Int, arg: args.input.quizID};
			argSQL[2] = {name: 'qIndex', type: TYPES.NVarChar, arg: args.input.qIndex};
			argSQL[3] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
			argSQL[4] = {name: 'question', type: TYPES.NVarChar, arg: args.input.question};
			argSQL[5] = {name: 'image', type: TYPES.NVarChar, arg: args.input.image};
			argSQL[6] = {name: 'options', type: TYPES.NVarChar, arg: args.input.options};
			argSQL[7] = {name: 'correctAnswer', type: TYPES.NVarChar, arg: args.input.correctAnswer};
			argSQL[8] = {name: 'isManual', type: TYPES.Bit, arg: (args.input.isManual) ? 1 : 0};
			
			return context.db.executeSQL( 
					"UPDATE TestSchema.Questions SET " + 
					"quizID=@quizID, qIndex=@qIndex, type=@type, question=@question, image=@image, options=@options, correctAnswer=@correctAnswer, isManual=@isManual  " + 
					"OUTPUT INSERTED.id, INSERTED.quizID, INSERTED.qIndex, INSERTED.type, INSERTED.question, INSERTED.image, INSERTED.options, INSERTED.correctAnswer, INSERTED.isManual  WHERE id = @id;", 
					argSQL,
					false
				);
		}
	},
}

