import { getPosts } from "./getPosts";
import { getPostByPostId } from "./getPostByPostId";
import { getPostCreator } from "./getPostCreator";
import { createPost } from "./createPost";
import { updatePost } from "./updatePost";
import { deletePost } from "./deletePost";
import { getPostsByUsername } from "./getPostsByUsername";

const postResolver = {
  Query: {
    getPosts,
    getPostByPostId,
    getPostsByUsername,
  },
  Mutation: {
    createPost,
    updatePost,
    deletePost,
  },
  Post: {
    user: getPostCreator,
    postId: (post) => {
      return post.postId || post._id.toString();
    },
  },
};

export { postResolver };
