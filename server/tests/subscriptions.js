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
            for (let i=0; i<onSuccessCallbacks.length; i++) {
                setTimeout(function () {
                    onSuccessCallbacks[i](client);
                }, 4000 * i);
            }
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
    console.log('Running Quiz Updated Tests');
    console.log('==========================');

    // open a quiz
    openQuiz(client);

    // prep socket for data transfer
    setTimeout(function () {
        // init
        const socket = createSocket('quiz_updated');

        // subscribe to the quiz_updated event,
        // send what course to watch
        socket.emit('subscribe', 'quiz_updated', 123123);

        // attach quiz updated listener
        socket.on('quiz_updated', function (quiz) {
            handleUpdatedQuiz(socket, quiz);
        });

        // close a quiz
        setTimeout(function () {
            closeQuiz(client);
        }, 1000);
    }, 1000);
}

// handles updated quiz
function handleUpdatedQuiz (socket, quiz) {
    // show data from updated quiz
    console.log('quiz updated:', quiz);

    // unsubscribe from the quiz_updated event
    socket.emit('unsubscribe', 'quiz_updated', 123123);

    // close when done
    socket.disconnect();

    // done
    console.log('Done\n');
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

// QUIZ ANSWER CREATED

function subscription_quiz_answer_created (client) {
    console.log('Running Quiz Answer Created Tests');
    console.log('=================================');

    // init
    const socket = createSocket('quiz_answer_created');

    // subscribe to the quiz_answer_created event,
    // send what quiz to watch
    socket.emit('subscribe', 'quiz_answer_created', 1);

    // attach quiz answer created listener
    socket.on('quiz_answer_created', function (quizAnswer) {
        handleQuizAnswerCreated(socket, quizAnswer);
    });

    // close a quiz
    setTimeout(function () {
        createQuizAnswer(client);
    }, 2000);
}

// handles quiz answer created
function handleQuizAnswerCreated (socket, quizAnswer) {
    // show data from created quiz answer
    console.log('quiz answer created:', quizAnswer);

    // unsubscribe from the quiz_updated event
    socket.emit('unsubscribe', 'quiz_answer_created', 1);

    // close when done
    socket.disconnect();

    // done
    console.log('Done\n');
}

function createQuizAnswer (client) {
    // create query
    const query = `mutation {
        answerCreate (input: {
            userID: 6
            quizID: 1
            type: "true-false"
            content: "true"
        }) {
            userID
            quizID
            type
            content
        }
    }`

    // send request
    client.request(query)
        .then(response => {
            console.log('Attempted to create quiz answer...');
        })
        .catch(err => {
            console.log(err);
        });
}

// TESTALL

login([subscription_quiz_updated, subscription_quiz_answer_created]);