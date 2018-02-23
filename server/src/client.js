var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var dice = 3;
var sides = 6;
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open("POST", "/graphql");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onload = function () {
  console.log('data returned:', xhr.response);
}
var query = `query user(id: 1) {
	firstName
	lastName
}`;
xhr.send(JSON.stringify({
  query: query,
  variables: {},
})); 