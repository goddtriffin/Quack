testEndpoint = "quack.localtunnel.me/graphql";
testBody = JSON.stringify({query: "{ hello }"});

function get (endpoint, body) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("GET", endpoint);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        // console.log('data returned:', xhr.response);
        return xhr.response;
    }
    xhr.send(body);
}

function post (endpoint, body) {
    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    })
    .then(res => res.json())
    .then(res => console.log(res.data));
}

console.log(get(testEndpoint, testBody));