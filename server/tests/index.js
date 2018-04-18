// API CALL TESTING

/*
import fetch from "node-fetch";

const endpoint = "https://quack.localtunnel.me/graphql";

function sendRequest (request, callback) {
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(json => callback(json));
}

// TEST

const testQuery = { query: "{ users { firstName } }" }
const testMutation = { mutation: "{ userCreate( input: { firstName: \"t1\" lastName: \"t1\" email: \"t1@purdue.edu\" }, password: \"t1\") { firstName } }" };

function testCallback (json) {
    console.log(json);
}

// sendRequest(testQuery, testCallback);
// sendRequest(testMutation, testCallback);
*/

// VALIDATOR TESTING

const v = require('../src/graphql/validators/validate');
v.do_trigger(false);

let overall = {};
overall['score'] = 0;
overall['total'] = 0;

let tally;

console.log("==================");
console.log("START UNIT TESTING")
console.log("==================\n");

const answer = require('./answer');
tally = answer.testall();
overall['score'] += tally['score'];
overall['total'] += tally['total'];

console.log("\n==================\n");

const course = require('./course');
tally = course.testall();
overall['score'] += tally['score'];
overall['total'] += tally['total'];

console.log("\n==================\n");

const quiz = require('./quiz');
tally = quiz.testall();
overall['score'] += tally['score'];
overall['total'] += tally['total'];

console.log("\n==================\n");

const role = require('./role');
tally = role.testall();
overall['score'] += tally['score'];
overall['total'] += tally['total'];

console.log("\n==================\n");

const section = require('./section');
tally = section.testall();
overall['score'] += tally['score'];
overall['total'] += tally['total'];

console.log("\n==================\n");

const subscriptions = require('./subscriptions');
tally = subscriptions.testall();
overall['score'] += tally['score'];
overall['total'] += tally['total'];

console.log("\n==================");
console.log("FINAL SCORE: " + overall['score'] + "/" + overall['total']);
console.log("==================");

v.do_trigger(true);