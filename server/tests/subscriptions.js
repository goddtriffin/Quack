// 1 hr     |   Quiz updated
// "Given the server receives the correct request, a client can subscribe to a certain event."
// "Given a client subscribes to an event, it gets their updates."
// "Given a subscription is successfully implemented, all the test cases will pass."

// 1 hr     |   Quiz Answer created
// "Given quiz results can be viewed in real-time, an instructor should be able to see responses from their quiz for non-free response questions (true/false & multiple choice)."
// "Given quiz results can be viewed in real-time, a user should only be able to see their own answer and not any others for that quiz."
// "Given quiz results can be viewed in real-time, a user should only be able to see the class results once the instructor has made it available to view."

// INITIAL

// returns socket for automatic testing use
function createSocket (type) {
    // create
    const socket = require('socket.io-client')('http://endor-vm2.cs.purdue.edu:5000');

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

function subscription_quiz_updated (courseID) {
    // init
    const socket = createSocket('quiz_updated');

    // attach quiz updated listener
    socket.on('quiz_updated', function () {


        // close when done
        socket.disconnect();
    });

    // subscribe to the quiz_updated event,
    // send what course to watch
    socket.emit('subscribe quiz_updated', courseID);
}

// QUIZ ANSWER CREATED

function subscription_quiz_answer_created (quizID) {
    // init
    const socket = createSocket('quiz_answer_created');

    // attach quiz answer created listener
    socket.on('quiz_answer_created', function () {


        // close when done
        socket.disconnect();
    });

    // subscribe to the quiz_answer_created event,
    // send what quiz to watch
    socket.emit('subscribe quiz_answer_created', quizID);
}

// TESTALL

subscription_quiz_updated(123123);

subscription_quiz_answer_created(1);