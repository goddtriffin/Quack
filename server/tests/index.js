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

var user_tests = require('./user');
user_tests.testall();