const { ApolloServer } = require('apollo-server')

const gql = require('graphql-tag')
const mongoose = require('mongoose')
//Setting up the env
require('dotenv').config()

// DB Models
const Post = require('./models/Post.js')
const User = require('./models/User.js')


const typeDefs = gql`
  type Post{
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query{
    getPosts: [Post]
  }
`

const resolvers = {
  Query:{
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        console.log(error)
      }
    }
  }
}

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
