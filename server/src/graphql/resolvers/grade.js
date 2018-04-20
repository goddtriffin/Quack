import { validate_course_name } from '../validators/validate'
import jwt from 'jsonwebtoken';

var Request = require('tedious').Request;
var TYPES   = require('tedious').TYPES;
var argSQL = {};


export default {
    grades: async (args, context) => {
        if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
		return context.db.executeSQL("SELECT * FROM TestSchema.Grades", argSQL, true);
    	}
    },
    grade: async (args, context) => {
    	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
		argSQL[0] = {name: "id", type: TYPES.NVarChar, arg: args.id};
        	return context.db.executeSQL("SELECT * FROM TestSchema.Grades where id = @id", argSQL, false);
   	}
    },

    //    MUTATIONS     //
    gradeCreate: async (args, context) => {
	if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
	    	argSQL = {};
	    	argSQL[0] = {name: 'questionID', type: TYPES.Int, arg: args.input.questionID};
	    	argSQL[1] = {name: 'answerID', type: TYPES.Int, arg: args.input.answerID};
		argSQL[2] = {name: 'userID', type: TYPES.Int, arg: args.input.userID};
		argSQL[3] = {name: 'points', type: TYPES.Float, arg: args.input.points};
		argSQL[4] = {name: 'totalPoints', type: TYPES.Float, arg: args.input.totalPoints};
       		argSQL[5] = {name: 'quizID', type: TYPES.Float, arg: args.input.quizID}; 
		//console.log(argSQL);
		return context.db.executeSQL( 
			"INSERT INTO TestSchema.Grades (questionID, answerID, userID, points, totalPoints, quizID) OUTPUT " + 
		    "INSERTED.id, INSERTED.questionID, INSERTED.answerID, INSERTED.userID, INSERTED.points, INSERTED.totalPoints, INSERTED.quizID " + 
		    "VALUES (@questionID, @answerID, @userID, @points, @totalPoints, @quizID);", argSQL, false);
	}
    },
    gradeUpdate: async (args, context) => {
        if(!context.headers.hasOwnProperty('authorization')) {
                return new Error("No authorization");
        }else {
                try {
                        var decode = await jwt.verify(context.headers.authorization, context.JWT_SECRET);
                } catch(err) {
                        return new Error(err);
                }
                argSQL = {};
		argSQL[0] = {name: 'id', type: TYPES.Int, arg: args.id};
                argSQL[1] = {name: 'questionID', type: TYPES.Int, arg: args.input.questionID};
                argSQL[2] = {name: 'answerID', type: TYPES.Int, arg: args.input.answerID};
                argSQL[3] = {name: 'userID', type: TYPES.Int, arg: args.input.userID};
                argSQL[4] = {name: 'points', type: TYPES.Float, arg: args.input.points};
                argSQL[5] = {name: 'totalPoints', type: TYPES.Float, arg: args.input.totalPoints};
		argSQL[6] = {name: 'quizID', type: TYPES.Float, arg: args.input.quizID}; 
                //console.log(argSQL);
                return context.db.executeSQL(
			"UPDATE TestSchema.Grades SET " + 
			"questionID=@questionID, answerID=@answerID, userID=@userID, " +
			"points=@points, totalPoints=@totalPoints, quizID=@quizID OUTPUT INSERTED.id, INSERTED.questionID, INSERTED.answerID, INSERTED.userID, INSERTED.points, INSERTED.totalPoints, INSERTED.quizID " + 
			"WHERE id=@id", argSQL, false);        
	}
    }
}

