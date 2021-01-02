const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
//Setting up the env
require('dotenv').config()

// GraphQL
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

// Subscriptions are GraphQL operations that watch events emitted from Apollo Server.
// Subscriptions depend on use of a publish and subscribe primitive to generate the events that notify a subscription. 
// PubSub is a factory that creates event generators that is provided by all supported packages.
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }), // Middleware needed for authentication check
});

// Connecting to DB
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  const PORT = process.env.PORT || 5000;
  server.listen({ port: PORT }).then(res => console.log(`Server running on ${res.url}`));
});
