import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate_answer_type, validate_answer_content } from '../validators/validate'
import answerSubscriptions from '../subscriptions/answer';

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};

export default {
	// Query //

	answers: async (args, context) => {
		if (!context.headers.hasOwnProperty('authorization')) {
			return new Error("No authorization");
		} else {
			try {
				var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			} catch (err) {
				return new Error(err);
			}

			argSQL = {};

			return context.db.executeSQL("SELECT * FROM TestSchema.Answers", argSQL, true);
		}
	 },

	answer: async (args, context) => {
		if (!context.headers.hasOwnProperty('authorization')) {
			return new Error("No authorization");
		} else {
			try {
				var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			} catch (err) {
				return new Error(err);
			}

			// make sure Role with given id actually exists
			argSQL = {}
			argSQL[0] = {name: "id", type: TYPES.NVarChar, arg: args.id};

			return context.db.executeSQL("SELECT * FROM TestSchema.Answers where id = @id", argSQL, false);
		}
	},

	// Mutation //

	answerCreate: async (args, context) => {

		if (!context.headers.hasOwnProperty('authorization')) {
			return new Error("No authorization");
		} else {
			try {
				var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			} catch (err) {
				return new Error(err);
			}

			argSQL = {};
			argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.input.quizID};

			const quiz = await context.db.executeSQL("SELECT isOpen FROM TestSchema.Quizzes where id=@id",argSQL, false);
			if (!quiz.isOpen) {
				return new Error("Quiz is not available");
			}

			// return newly created User to client
			argSQL = {};
			argSQL[0] = {name: 'userID', type: TYPES.NVarChar, arg: args.input.userID};
			argSQL[1] = {name: 'questionID', type: TYPES.NVarChar, arg: args.input.questionID};	
			argSQL[2] = {name: 'quizID', type: TYPES.NVarChar, arg: args.input.quizID};
			argSQL[3] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
			argSQL[4] = {name: 'content', type: TYPES.NVarChar, arg: args.input.content};
			
			// send subscription
			const quizID = argSQL[2].arg;
			const answer = {
				userID:		argSQL[0].arg,
				questionID:	argSQL[1].arg,
				type:		argSQL[3].arg,
				content:	argSQL[4].arg
			};
			answerSubscriptions.sendAnswerCreationEvent(quizID, answer);

			return context.db.executeSQL( 
					"INSERT INTO TestSchema.Answers (userID, questionID, quizID, type, content) OUTPUT " + 
					"INSERTED.id, INSERTED.userID, INSERTED.questionID, INSERTED.quizID, INSERTED.type, INSERTED.content VALUES (@userID, @questionID, @quizID, @type, @content);", 
					argSQL, 
					false
				);
		}
	}, 

	answerUpdate: async (args, context) => {
		if (!context.headers.hasOwnProperty('authorization')) {
			return new Error("No authorization");
		} else {
			try {
				var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			} catch (err) {
				return new Error(err);
			}
			
			// return newly created User to client
			argSQL = {};
			argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
			argSQL[1] = {name: 'userID', type: TYPES.NVarChar, arg: args.input.userID};
			argSQL[2] = {name: 'questionID', type: TYPES.NVarChar, arg: args.input.questionID};
			argSQL[3] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
			argSQL[4] = {name: 'content', type: TYPES.NVarChar, arg: args.input.content};

			return context.db.executeSQL( 
					"UPDATE TestSchema.Answers SET " + 
					"userID = @userID, questionID = @questionID, type = @type, content = @content   " + 
					"OUTPUT INSERTED.id, INSERTED.userID, INSERTED.questionID, INSERTED.type, INSERTED.content WHERE id = @id;", 
					argSQL,
					false
				);
		} 
	},
}