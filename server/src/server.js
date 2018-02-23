var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

import types from './graphql/types';
import rootValue from './graphql/resolvers';
import sqlConnector from './graphql/connectors';
import Sequelize from 'sequelize';

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

var sql = require('mssql');

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
    options: {
        database: 'quackDB',
        rowCollectionOnRequestCompletion: true
    }
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

console.log(types);
// console.log(rootValue);

const schema = buildSchema(types);

const sqlDB = new sqlConnector(config);

//console.log('**Node CRUD sample with Sequelize and MSSQL **');
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue,
  context: {
    db: sqlDB 
  },
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

/*function executeStatement() {
  var request = new Request("SELECT * FROM TestSchema.Users", function(err, rowCount, rows) {        
    if (err) {
        console.log(err);
    }
    else {
      console.log(rowCount + ' rows');
      console.log(rows);
      var jsonArray = []
      rows.forEach(function (columns) {
          var rowObject ={};
          columns.forEach(function(column) {
              rowObject[column.metadata.colName] = column.value;
          });
          jsonArray.push(rowObject)
      });
      console.log(jsonArray);
    }
  });
  //console.log(rows);

  connection.execSql(request);
}*/

