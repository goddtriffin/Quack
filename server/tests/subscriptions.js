// 1 hr     |   manually opened Quiz
// "Given that the second task is completed successfully, a user should see an option to take a quiz when it is started."


// 1 hr     |   updated Quiz
// "Given the server receives the correct request, a client can subscribe to a certain event.""
// "Given a client subscribes to an event, it gets their updates.""
// "Given a subscription is successfully implemented, all the test cases will pass.""


const v = require('../src/graphql/validators/validate');

// TEST

function subscription_dummy () {
    // const msg = v.validate_subscription_dummy(var);
    const msg = 'ok';

    if (msg !== 'ok') return "Should've returned ok.";
    return 'ok';
}

// TESTALL

module.exports = {
    testall: function () {
        console.log("Running Subscription Testall");
        
        // congregate all tests
        const tests = [
            subscription_dummy
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