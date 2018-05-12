const v = require('../src/graphql/validators/validate');

// ANSWER TYPE

function answer_type_null () {
    const msg = v.validate_answer_type(null);

    if (msg === 'ok') return "Should've returned false due to null variable.";
    return 'ok';
}

function answer_type_not_string () {
    const msg = v.validate_answer_type(2);

    if (msg === 'ok') return "Should've returned false due to not being a string.";
    return 'ok';
}

function answer_type_empty () {
    const msg = v.validate_answer_type("");

    if (msg === 'ok') return "Should've returned false due to empty string.";
    return 'ok';
}

function answer_type_whitespace () {
    const msg = v.validate_answer_type("       ");

    if (msg === 'ok') return "Should've returned false due to being filled with whitespace.";
    return 'ok';
}

function answer_type_fine () {
    const msg = v.validate_answer_type("hello");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

// ANSWER CONTENT

function answer_content_null () {
    const msg = v.validate_answer_content(null);

    if (msg === 'ok') return "Should've returned false due to null variable.";
    return 'ok';
}

function answer_content_not_string () {
    const msg = v.validate_answer_content(2);

    if (msg === 'ok') return "Should've returned false due to not being a string.";
    return 'ok';
}

function answer_content_empty () {
    const msg = v.validate_answer_content("");

    if (msg === 'ok') return "Should've returned false due to empty string.";
    return 'ok';
}

function answer_content_whitespace () {
    const msg = v.validate_answer_content("       ");

    if (msg === 'ok') return "Should've returned false due to being filled with whitespace.";
    return 'ok';
}

function answer_content_fine () {
    const msg = v.validate_answer_content("hello");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

// TESTALL

module.exports = {
    testall: function () {
        console.log("Running Answer Testall");
        
        // congregate all tests
        const tests = [
            answer_type_null, answer_type_not_string, answer_type_empty, answer_type_whitespace, answer_type_fine, 
            answer_content_null, answer_content_not_string, answer_content_empty, answer_content_whitespace, answer_content_fine
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