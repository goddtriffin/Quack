import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate_answer_type, validate_answer_content } from '../validators/validate'

// subscriptions
import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


export default {

	// Query //

	answers: async (args, context) => {
		 if(!context.headers.hasOwnProperty('authorization')) {
			 return new Error("No authorization");
		 }else {
			 try {
				 var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			 } catch(err) {
				 return new Error(err);
			 }
			 argSQL = {};
			 return context.db.executeSQL("SELECT * FROM TestSchema.Answers", argSQL, true);
		 }
	 },


	answer: async (args, context) => {
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
			return context.db.executeSQL("SELECT * FROM TestSchema.Answers where id = @id", argSQL, false);
		}
	},

	// Mutation //

	answerCreate: async (args, context) => {

		      if(!context.headers.hasOwnProperty('authorization')) {
			      return new Error("No authorization");
		      }else {
			      try {
				      var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			      } catch(err) {
				      return new Error(err);
			      }
			      // return newly created User to client
			      argSQL = {};
			      argSQL[0] = {name: 'userID', type: TYPES.NVarChar, arg: args.input.userID};
			      argSQL[1] = {name: 'quizID', type: TYPES.NVarChar, arg: args.input.quizID};
			      argSQL[2] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
			      argSQL[3] = {name: 'content', type: TYPES.NVarChar, arg: args.input.content};


			      //console.log(argSQL);
			      return context.db.executeSQL( 
					      "INSERT INTO TestSchema.Answers (userID, quizID, type, content) OUTPUT " + 
					      "INSERTED.id, INSERTED.userID, INSERTED.quizID, INSERTED.type, INSERTED.content VALUES (@userID, @quizID, @type, @content);", 
					      argSQL, false);
		      }
	      }, 

	answerUpdate: async (args, context) => {
		      if(!context.headers.hasOwnProperty('authorization')) {
			      return new Error("No authorization");
		      }else {
			      try {
				      var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
			      } catch(err) {
				      return new Error(err);
			      }
			      // validate all user input
			      validate_answer_type(args.input.type);
			      validate_answer_content(args.input.content);

			      // update database of existing Role (async task)

			      // return newly created User to client
			      argSQL = {};
			      argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
			      argSQL[1] = {name: 'userID', type: TYPES.NVarChar, arg: args.input.userID};
			      argSQL[2] = {name: 'quizID', type: TYPES.NVarChar, arg: args.input.quizID};
			      argSQL[3] = {name: 'type', type: TYPES.NVarChar, arg: args.input.type};
			      argSQL[4] = {name: 'content', type: TYPES.NVarChar, arg: args.input.content};


			      //console.log(argSQL);
			      return context.db.executeSQL( 
					      "UPDATE TestSchema.Answers SET " + 
					      "userID = @userID, quizID = @quizID, type = @type, content = @content   " + 
					      "OUTPUT INSERTED.id, INSERTED.userID, INSERTED.quizID, INSERTED.type, INSERTED.content WHERE id = @id;", 
					      argSQL, false);
		      } 
	      },

	      // Subscription

	answerCreated: {
		subscribe: () => pubsub.asyncIterator('answer_created')
	}
}
