// 5 hours = 10 unit tests
// Given the server receives the appropriate request, a quiz can be created in the database.
// Given the server receives the appropriate request, a quiz can be received from the database.
// Given the server receives the appropriate request, an instructor can see all of the quizzes for a given class.

// 5 hours = 10 unit tests
// Given the server receives the appropriate request, an Answer can be created in the database.
// Given the server receives the appropriate request, an Answer can be received from the database.

const v = require('../src/graphql/validators/validate');

// QUIZ QUESTION

function quiz_question_null () {
    const msg = v.validate_quiz_question(null);

    if (msg === 'ok') return "Should've returned false due to null variable.";
    return 'ok';
}

function quiz_question_fine () {
    const msg = v.validate_quiz_question("hello");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

// QUIZ OPTIONS

function quiz_options_null () {
    const msg = v.validate_quiz_options(null);

    if (msg === 'ok') return "Should've returned false due to null variable.";
    return 'ok';
}

function quiz_options_fine () {
    const msg = v.validate_quiz_options("hello");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

// QUIZ CORRECT ANSWER

function quiz_correct_answer_null () {
    const msg = v.validate_quiz_correct_answer(null);

    if (msg === 'ok') return "Should've returned false due to null variable.";
    return 'ok';
}

function quiz_correct_answer_fine () {
    const msg = v.validate_quiz_correct_answer("hello");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

// TESTALL

module.exports = {
    testall: function () {
        console.log("Running Quiz Testall");
        
        // congregate all tests
        const tests = [
            quiz_question_null, quiz_question_fine,
            quiz_options_null, quiz_options_fine,
            quiz_correct_answer_null, quiz_correct_answer_fine
        ]

        // cycle through tests counting the scores
        let score = 0;
        for (i=0; i<tests.length; i++) {
            const msg = tests[i]();

            if (msg === 'ok') {
                score++;
            } else {
                console.log("" + tests[i] + ": " + msg);
            }
        }

        // print score
        console.log("Finished. Score: " + score + "/" + tests.length);

        // let the big momma know about the points
        let tally = {};
        tally['score'] = score;
        tally['total'] = tests.length;
        return tally;
    }
};