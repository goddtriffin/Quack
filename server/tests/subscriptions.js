// 1 hr     |   Quiz updated
// "Given the server receives the correct request, a client can subscribe to a certain event."
// "Given a client subscribes to an event, it gets their updates."
// "Given a subscription is successfully implemented, all the test cases will pass."

// 1 hr     |   Quiz Answer created
// "Given quiz results can be viewed in real-time, an instructor should be able to see responses from their quiz for non-free response questions (true/false & multiple choice)."
// "Given quiz results can be viewed in real-time, a user should only be able to see their own answer and not any others for that quiz."
// "Given quiz results can be viewed in real-time, a user should only be able to see the class results once the instructor has made it available to view."

// import { request, GraphQLClient } from 'graphql-request'

const { request, GraphQLClient } = require('graphql-request')

const graphqlEndpoint = "http://endor-vm2.cs.purdue.edu:4000/graphql";
const socketEndpoint = "http://endor-vm2.cs.purdue.edu:5000";

// INITIAL

function login (onSuccessCallbacks) {
    // create query
    const query = `mutation {
        login (email: "todd@griffin", password: "bees") {
            jwt
        }
    }`

    // send request
    return request(graphqlEndpoint, query)
        .then(response => {
            // create client with auth
            const client = new GraphQLClient(graphqlEndpoint, {
                headers: {
                    Authorization: response.login.jwt,
                },
            });

            // run success callbacks w/ authed client
            onSuccessCallbacks.forEach(function (callback) {
                callback(client);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

// returns socket for automatic testing use
function createSocket (type) {
    // create
    const socket = require('socket.io-client')(socketEndpoint);

    // handle new connection
    socket.on('connect', function () {
        console.log('Connected to subscriptions:', type);
    });

    // handle disconnection
    socket.on('disconnect', function () {
        console.log('Disconnected from subscriptions:', type);
    });

    // ready
    return socket;
}

// QUIZ UPDATED

function subscription_quiz_updated (client) {
    // open a quiz
    openQuiz(client);

    // init
    const socket = createSocket('quiz_updated');

    // subscribe to the quiz_updated event,
    // send what course to watch
    socket.emit('subscribe', 'quiz_updated', 123123);

    // attach quiz updated listener
    socket.on('quiz_updated', handleUpdatedQuiz);

    // close a quiz
    const boundCloseQuiz = closeQuiz.bind(null, client);
    setTimeout(boundCloseQuiz, 1000);
}

// opens a quiz in the database
function openQuiz (client) {
    // create query
    const query = `mutation {
        quizUpdate (id: 1, input: {
            courseID: 123123,
            date: "04182018"
            isOpen: true
        }) {
            courseID
            date
            isOpen
        }
    }`

    // send request
    client.request(query)
        .then(response => {
            console.log('Attempted to open quiz 1...');
        })
        .catch(err => {
            console.log(err);
        });
}

// closes a quiz in the database
function closeQuiz (client) {
    // create query
    const query = `mutation {
        quizUpdate (id: 1, input: {
            courseID: 123123,
            date: "04182018"
            isOpen: false
        }) {
            courseID
            date
            isOpen
        }
    }`

    // send request
    client.request(query)
        .then(response => {
            console.log('Attempted to close quiz 1...');
        })
        .catch(err => {
            console.log(err);
        });
}

// handles updated quiz
function handleUpdatedQuiz (quiz) {
    // show data from updated quiz
    console.log('quiz updated:', quiz);

    // unsubscribe from the quiz_updated event
    socket.emit('unsubscribe', 'quiz_updated');

    // close when done
    socket.disconnect();
}

// QUIZ ANSWER CREATED

function subscription_quiz_answer_created (quizID) {
    // init
    const socket = createSocket('quiz_answer_created');

    // attach quiz answer created listener
    socket.on('quiz_answer_created', function () {
        // TODO

        // close when done
        socket.disconnect();
    });

    // subscribe to the quiz_answer_created event,
    // send what quiz to watch
    socket.emit('subscribe quiz_answer_created', quizID);
}

// TESTALL

login([subscription_quiz_updated, subscription_quiz_answer_created]);