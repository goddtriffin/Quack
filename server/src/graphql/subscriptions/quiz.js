// containers
const quizUpdateSubscribers = {}; //  key:value  |  courseID:[socket]

// subscribes a socket to quiz updates from a specific course
function subscribeToQuizUpdate (socket, courseID) {
    // if courseID isn't subscribed to yet,
    // create it as a key and pair it with an empty socket list
    if (!quizUpdateSubscribers.hasOwnProperty(socketID)) {
            quizUpdateSubscribers[socketID] = [];
    }

    // push the socket into the subscriber list attached to the specific courseID
    quizUpdateSubscribers[socketID].push(socketID);
}

// unsubscribes a socket to quiz updates from a specific course
function unsubscribeToQuizUpdate (socket, courseID) {
    // if courseID doesn't exist in quiz update subscriber list,
    // error, don't do anything
    if (!quizUpdateSubscribers.hasOwnProperty(courseID)) {
            console.log('quiz update (un)subscriber error: courseID', courseID, 'doesn\'t exist.');
            return;
    }

    // get index of socket within courseID subscriber list
    const index = quizUpdateSubscribers[courseID].indexOf(socket);

    // check if socket exists within courseID subscriber list
    if (index === -1) {
            console.log('quiz update (un)subscriber error: socket', socket.id, 'isn\'t subscribed to ', courseID,'.');
            return;
    }

    // everything gucci, remove socket from courseID subscriber list
    array.splice(index, 1);
}

// send newly updated quiz information to all sockets
// that are subscribed to the corresponding courseID
function sendQuizUpdateEvent (courseID, quiz) {
    // if courseID is being subscribed to,
    if (quizUpdateSubscribers.hasOwnProperty(courseID)) {
            // send updated quiz info to socket
            quizUpdateSubscribers[courseID].forEach(function (socket) {
                    socket.emit('quiz_updated', quiz);
            });
    }
}

export default {
    subscribeToQuizUpdate,
    unsubscribeToQuizUpdate,
    sendQuizUpdateEvent
};