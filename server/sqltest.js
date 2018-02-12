var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
var config = {
  userName: 'quackRoot@quackserver-useast', // update me
  password: 'goddtriffin#1334', // update me
  server: 'quackserver-useast.database.windows.net',
  database: 'quackDatabase',
  options: {
      encrypt: true
  }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});