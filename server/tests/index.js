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

const feedback = require('./feedback');
tally = feedback.testall();
overall['score'] += tally['score'];
overall['total'] += tally['total'];

console.log("\n==================");
console.log("FINAL SCORE: " + overall['score'] + "/" + overall['total']);
console.log("==================");

v.do_trigger(true);