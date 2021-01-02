const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require('../../utils/checkAuth');

module.exports = {
  /*-------- Queries ------------*/
  Query: {
    /*-------- Get all the Posts ------------*/
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    /*-------- Get a single Post ------------*/
    async getPost(parent, { postId }) {
      try {
        const post = await Post.findById(postId);

        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  /*-------- Mutations ------------*/
  Mutation: {
    /*-------- Create New Post ------------*/
    async createPost(parent, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError("Post must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubsub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },
    /*-------- Delete a Post ------------*/
    async deletePost(parent, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);

        if (post) {
          if (post.username === user.username) {
            await post.delete();
            return "Post deleted successfully";
          } else {
            throw new AuthenticationError(
              "Only post creator can delete the post"
            );
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    /*-------- Add/Remove like to a Post ------------*/
    async likePost(parent, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Remove like
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Add like
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("Invalid post to add/remove like");
      }
    },
  },
  /*-------- Subscriptions ------------*/
  Subscription: {
    newPost: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
