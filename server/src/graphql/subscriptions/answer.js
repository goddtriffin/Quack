// containers
const answerCreationSubscribers = {}; //  key:value  |  quizID:[socket]

// subscribes a socket to answer creations from a specific course
function subscribeToAnswerCreation (socket, quizID) {
    // if quizID isn't subscribed to yet,
    // create it as a key and pair it with an empty socket list
    if (!answerCreationSubscribers.hasOwnProperty(quizID)) {
            answerCreationSubscribers[quizID] = [];
    }

    // push the socket into the subscriber list attached to the specific quizID
    answerCreationSubscribers[quizID].push(socket);
}

// unsubscribes a socket to answer creations from a specific course
function unsubscribeToAnswerCreation (socket, quizID) {
    // if quizID doesn't exist in answer update subscriber list,
    // error, don't do anything
    if (!answerCreationSubscribers.hasOwnProperty(quizID)) {
		console.error('answer creation (un)subscriber error: quizID', quizID, 'doesn\'t exist.');
		return;
    }

    // get index of socket within quizID subscriber list
    const index = answerCreationSubscribers[quizID].indexOf(socket);

    // check if socket exists within quizID subscriber list
    if (index === -1) {
		console.error('answer creation (un)subscriber error: socket', socket.id, 'isn\'t subscribed to ', quizID,'.');
		return;
    }

    // everything gucci, remove socket from quizID subscriber list
    answerCreationSubscribers[quizID].splice(index, 1);
}

// send newly updated answer information to all sockets
// that are subscribed to the corresponding quizID
function sendAnswerCreationEvent (quizID, answer) {
    // if quizID is being subscribed to,
    if (answerCreationSubscribers.hasOwnProperty(quizID)) {
		// send updated answer info to socket
		answerCreationSubscribers[quizID].forEach(function (socket) {
				socket.emit('quiz_answer_created', answer);
		});
    }
}

export default {
    subscribeToAnswerCreation,
    unsubscribeToAnswerCreation,
    sendAnswerCreationEvent
};