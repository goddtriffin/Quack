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
v.do_trigger(true);

let overall = {};
overall['score'] = 0;
overall['total'] = 0;

let tally;

console.log("==================");
console.log("START UNIT TESTING")
console.log("==================");

const answer = require('./answer');
tally = answer.testall();
overall['score'] += tally['score'];
overall['total'] += tally['total'];

console.log("==================");

const course = require('./course');
tally = course.testall();
overall['score'] += tally['score'];
overall['total'] += tally['total'];

console.log("==================");
console.log("FINAL SCORE: " + overall['score'] + "/" + overall['total']);
console.log("==================");

v.do_trigger(true);