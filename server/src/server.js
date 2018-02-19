var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var config;

// Create connection to database
var prodConfig = {
  userName: 'quackRoot@quackserver-useast', // update me
  password: 'goddtriffin#1334', // update me
  server: 'quackserver-useast.database.windows.net',
  database: 'quackDatabase',
  options: {
      encrypt: true
  }
}

var localConfig = {
    userName: 'sa',
    password: 'Test@123', 
    server: 'localhost',
    database: 'quackDB',
}

if(process.argv.length != 3) {
    console.log("Usage: node server.js <type>");
    process.exit(1);
}

if(process.argv[2] == "p" ) {
    config = prodConfig;
}
else if(process.argv[2] == "l") {
    config = localConfig;
}
else {
    console.log("Incorrect server type. Use either 'p' or 'l' to connect to local or production database ");
    process.exit(1);
}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello World";
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');


var connection = new Connection(config);
// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});
