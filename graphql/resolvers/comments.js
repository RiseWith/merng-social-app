const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {},
  Mutation: {
    addComment: async (parent, { postId, body }, context) => {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
    deleteComment: async (parent, { postId, commentId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        // Checking if the comment exists
        if (post.comments[commentIndex] === undefined) {
          throw new UserInputError("Comment not found");
        }

        // Checking if the user is the owner of the comment
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();

          return post;
        } else {
          throw new AuthenticationError("User doesn't have permission to delete the comment")
        }
      } else {
        throw new UserInputError("Post not found");
      }
    }
  },
};
