var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

import types from './graphql/types';
import rootValue from './graphql/resolvers';

console.log(types);
// console.log(rootValue);

const schema = buildSchema(types);

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');