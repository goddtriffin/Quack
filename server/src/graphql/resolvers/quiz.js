import { validate_quiz_type, validate_quiz_question, validate_quiz_options, validate_quiz_correct_answer, validate_date } from '../validators/validate'
import jwt from 'jsonwebtoken';

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};

// subscriptions
const quizUpdateSubscribers = {}; //  key:value  |  courseID:[socket]
// subscriptions

/*
 *Different types of quizzes: multiple-choice, short-answer, true-false
 *Date format: "MMDDYYYY"
 *image: default "image"
 */

export default {

        // subscribes a socket to quiz updates from a specific course
        subscribeToQuizUpdate (socket, courseID) {
                // if courseID isn't subscribed to yet,
                // create it as a key and pair it with an empty socket list
                if (!quizUpdateSubscribers.hasOwnProperty(socketID)) {
                        quizUpdateSubscribers[socketID] = [];
                }

                // push the socket into the subscriber list attached to the specific courseID
                quizUpdateSubscribers[socketID].push(socketID);
        },

        // unsubscribes a socket to quiz updates from a specific course
        unsubscribeToQuizUpdate (socket, courseID) {
                // if courseID doesn't exist in quiz update subscriber list,
                // error, don't do anything
                if (!quizUpdateSubscribers.hasOwnProperty(courseID)) {
                        console.log('quiz update (un)subscriber error: courseID', courseID, 'doesn\'t exist.');
                        return;
                }

                // get index of socket within courseID subscriber list
                const index = quizUpdateSubscribers[courseID].indexOf(socket);

                // check if socket exists within courseID subscriber list
                if (index === -1) {
                        console.log('quiz update (un)subscriber error: socket', socket.id, 'isn\'t subscribed to ', courseID,'.');
                        return;
                }

                // everything gucci, remove socket from courseID subscriber list
                array.splice(index, 1);
        },

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
                
                // start handling subscriptions
                const courseID = argSQL[1].arg;

                // if courseID is being subscribed to,
                if (quizUpdateSubscribers.hasOwnProperty(courseID)) {
                        // send updated quiz info to socket
                        quizUpdateSubscribers[courseID].forEach(function (socket) {
                                socket.emit('quiz_updated', {
                                        id:             argSQL[0].arg,
                                        courseID:       argSQL[1].arg,
                                        date:           argSQL[2].arg,
                                        isOpen:         argSQL[3].arg
                                });
                        });
                }
                // done with subscriptions
		
		//console.log(argSQL);
		return context.db.executeSQL( 
		    "UPDATE TestSchema.Quizzes SET " + 
		     "courseID=@courseID,  date=@date, isOpen=@isOpen " + 
		     "OUTPUT INSERTED.id, INSERTED.courseID, INSERTED.date, INSERTED.isOpen WHERE id = @id;", 
		    argSQL, false);
    	}
    },
}
