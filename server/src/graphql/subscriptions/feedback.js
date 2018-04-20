// containers
const feedbackCreationSubscribers = {}; //  key:value  |  feedbackID:[socket]

// subscribes a socket to feedback creations from a specific course
function subscribeToFeedbackCreation (socket, feedbackID) {
    // if feedbackID isn't subscribed to yet,
    // create it as a key and pair it with an empty socket list
    if (!feedbackCreationSubscribers.hasOwnProperty(feedbackID)) {
            feedbackCreationSubscribers[feedbackID] = [];
    }

    // push the socket into the subscriber list attached to the specific feedbackID
    feedbackCreationSubscribers[feedbackID].push(socket);
}

// unsubscribes a socket to feedback creations from a specific course
function unsubscribeToFeedbackCreation (socket, feedbackID) {
    // if feedbackID doesn't exist in feedback update subscriber list,
    // error, don't do anything
    if (!feedbackCreationSubscribers.hasOwnProperty(feedbackID)) {
            console.error('Feedback creation (un)subscriber error: feedbackID', feedbackID, 'doesn\'t exist.');
            return;
    }

    // get index of socket within feedbackID subscriber list
    const index = feedbackCreationSubscribers[feedbackID].indexOf(socket);

    // check if socket exists within feedbackID subscriber list
    if (index === -1) {
            console.error('Feedback creation (un)subscriber error: socket', socket.id, 'isn\'t subscribed to ', feedbackID,'.');
            return;
    }

    // everything gucci, remove socket from feedbackID subscriber list
    feedbackCreationSubscribers[feedbackID].splice(index, 1);
}

// send newly created feedback information to all sockets
// that are subscribed to the corresponding feedbackID
function sendFeedbackCreationEvent (feedbackID, feedback) {
    // if feedbackID is being subscribed to,
    if (feedbackCreationSubscribers.hasOwnProperty(feedbackID)) {
            // send updated feedback info to socket
            feedbackCreationSubscribers[feedbackID].forEach(function (socket) {
                    socket.emit('quiz_feedback_created', feedback);
            });
    }
}

export default {
    subscribeToFeedbackCreation,
    unsubscribeToFeedbackCreation,
    sendFeedbackCreationEvent
};