const v = require('../src/graphql/validators/validate');

// SECTIONS NAME

function section_name_null () {
    const msg = v.validate_section_name(null);

    if (msg === 'ok') return "Should've returned false due to null variable.";
    return 'ok';
}

function section_name_not_string () {
    const msg = v.validate_section_name(2);

    if (msg === 'ok') return "Should've returned false due to not being a string.";
    return 'ok';
}

function section_name_empty () {
    const msg = v.validate_section_name("");

    if (msg === 'ok') return "Should've returned false due to empty string.";
    return 'ok';
}

function section_name_whitespace () {
    const msg = v.validate_section_name("       ");

    if (msg === 'ok') return "Should've returned false due to being filled with whitespace.";
    return 'ok';
}

function section_name_fine () {
    const msg = v.validate_section_name("hello");

    if (msg !== 'ok') return "Should've returned a-okay.";
    return 'ok';
}

// TESTALL

module.exports = {
    testall: function () {
        console.log("Running Section Testall");
        
        // congregate all tests
        const tests = [
            section_name_null, section_name_not_string, section_name_empty, section_name_whitespace, section_name_fine
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