// 2.5 hours = 5 unit tests
// Given the server receives the appropriate request, a Feedback can be created in the database.
// Given the server receives the appropriate request, a Feedback can be received from the database.
// Given the tests for the Feedback are ran, they all pass.

const v = require('../src/graphql/validators/validate');

// FEEDBACK CONTENT

function feedback_content_null () {
    const msg = v.validate_feedback_content(null);

    if (msg === 'ok') return "Should've returned false due to null variable.";
    return 'ok';
}

function feedback_content_not_string () {
    const msg = v.validate_feedback_content(2);

    if (msg === 'ok') return "Should've returned false due to not being a string.";
    return 'ok';
}

function feedback_content_empty () {
    const msg = v.validate_feedback_content("");

    if (msg === 'ok') return "Should've returned false due to empty string.";
    return 'ok';
}

function feedback_content_whitespace () {
    const msg = v.validate_feedback_content("       ");

    if (msg === 'ok') return "Should've returned false due to being filled with whitespace.";
    return 'ok';
}

function feedback_content_fine () {
    const msg = v.validate_feedback_content("hello");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

// TESTALL

module.exports = {
    testall: function () {
        console.log("Running Feedback Testall");
        
        // congregate all tests
        const tests = [
            feedback_content_null, feedback_content_not_string, feedback_content_empty, feedback_content_whitespace, feedback_content_fine
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