const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
//Setting up the env
require('dotenv').config()

// GraphQL
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  const PORT = process.env.PORT || 5000;
  server.listen({ port: PORT }).then(res => console.log(`Server running on ${res.url}`));
});
