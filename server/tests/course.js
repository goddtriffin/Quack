const v = require('../src/graphql/validators/validate');

// COURSE NAME

function course_name_null () {
    const msg = v.validate_course_name(null);

    if (msg === 'ok') return "Should've returned false due to null variable.";
    return 'ok';
}

function course_name_not_string () {
    const msg = v.validate_course_name(2);

    if (msg === 'ok') return "Should've returned false due to not being a string.";
    return 'ok';
}

function course_name_empty () {
    const msg = v.validate_course_name("");

    if (msg === 'ok') return "Should've returned false due to empty string.";
    return 'ok';
}

function course_name_whitespace () {
    const msg = v.validate_course_name("       ");

    if (msg === 'ok') return "Should've returned false due to being filled with whitespace.";
    return 'ok';
}

function course_name_fine () {
    const msg = v.validate_course_name("hello");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

// COURSE NAME FINE EXTRAS

function course_name_fine2 () {
    const msg = v.validate_course_name("cs252");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

function course_name_fine3 () {
    const msg = v.validate_course_name("cs307");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

function course_name_fine4 () {
    const msg = v.validate_course_name("cs180");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

function course_name_fine5 () {
    const msg = v.validate_course_name("cs420");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

function course_name_fine6 () {
    const msg = v.validate_course_name("cs69");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

// TESTALL

module.exports = {
    testall: function () {
        console.log("Running Course Testall");
        
        // congregate all tests
        const tests = [
            course_name_null, course_name_not_string, course_name_empty, course_name_whitespace, course_name_fine, 
            course_name_fine2, course_name_fine3, course_name_fine4, course_name_fine5, course_name_fine6
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