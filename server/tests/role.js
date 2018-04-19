// 2.5 hours = 5 unit tests
// Given the server receives the appropriate request, a Role can be created in the database.
// Given the server receives the appropriate request, a Role can be received from the database.
// Given the Roles class test cases are ran, they will all pass.

const v = require('../src/graphql/validators/validate');

// ROLES TYPE

function role_type_null () {
    const msg = v.validate_role_type(null);

    if (msg === 'ok') return "Should've returned false due to null variable.";
    return 'ok';
}

function role_type_not_string () {
    const msg = v.validate_role_type(2);

    if (msg === 'ok') return "Should've returned false due to not being a string.";
    return 'ok';
}

function role_type_empty () {
    const msg = v.validate_role_type("");

    if (msg === 'ok') return "Should've returned false due to empty string.";
    return 'ok';
}

function role_type_whitespace () {
    const msg = v.validate_role_type("       ");

    if (msg === 'ok') return "Should've returned false due to being filled with whitespace.";
    return 'ok';
}

function role_type_fine () {
    const msg = v.validate_role_type("hello");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

// TESTALL

module.exports = {
    testall: function () {
        console.log("Running Role Testall");
        
        // congregate all tests
        const tests = [
            role_type_null, role_type_not_string, role_type_empty, role_type_whitespace, role_type_fine
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