// containers
const feedbackCreationSubscribers = []; //  [socket]

// subscribes a socket to feedback creations
function subscribeToFeedbackCreation (socket) {
    // push the socket into the subscriber list
    feedbackCreationSubscribers.push(socket);
}

// unsubscribes a socket to feedback creations
function unsubscribeToFeedbackCreation (socket) {
    // get index of socket within subscriber list
    const index = feedbackCreationSubscribers.indexOf(socket);

    // check if socket exists within feedbackID subscriber list
    if (index === -1) {
	    console.error('Feedback creation (un)subscriber error: socket', socket.id, 'isn\'t subscribed to feedback creations.');
	    return;
    }

    // everything gucci, remove socket from subscriber list
    feedbackCreationSubscribers.splice(index, 1);
}

// send newly created feedback information to all sockets that are subscribed
function sendFeedbackCreationEvent (feedback) {
    // send updated feedback info to socket
    feedbackCreationSubscribers.forEach(function (socket) {
		socket.emit('quiz_feedback_created', feedback);
	});
}

export default {
    subscribeToFeedbackCreation,
    unsubscribeToFeedbackCreation,
    sendFeedbackCreationEvent
};