import { getPosts } from "./getPosts";
import { getPostByPostId } from "./getPostByPostId";
import { getPostCreator } from "./getPostCreator";
import { createPost } from "./createPost";
import { updatePost } from "./updatePost";
import { deletePost } from "./deletePost";
import { getPostsByUsername } from "./getPostsByUsername";
import { favoritePost } from "./favoritePost";
import { getFavorited } from "./getFavorited";

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
    favoritePost,
  },
  Post: {
    user: getPostCreator,
    postId: (post) => {
      return post.postId || post._id.toString();
    },
    favorites: (post) => {
      const numFavorites = post.likeCount;
      return numFavorites == null ? 0 : numFavorites;
    },
    favorited: getFavorited,
  },
};

export { postResolver };
