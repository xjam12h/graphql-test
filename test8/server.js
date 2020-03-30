var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type User {
    id: String
    name: String
    data:Data
  }
  type Data{
    a:String,
    e:String,
    u:String,
    i:String,
    o:String,
      
  }
  type Query {
    user(id: String): User
  }
`);

// Maps id to User object
var fakeDatabase = {
  'a': {
    id: 'a',
    data:{
        a:"etw",
        e:"etre",
        i:"twe",
        u:"gsd",
        o:"gareag",
    },
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};

var root = {
  user: ({id}) => {
    return fakeDatabase[id];
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