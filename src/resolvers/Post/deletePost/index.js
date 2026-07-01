import { getAuth } from "firebase-admin/auth";

async function deletePost(parent, { postId }, { models, requestor }, info) {
  if (!requestor) {
    throw Error("Not authorized.");
  }

  let post;
  try {
    post = await models.models.Post.findById(postId).exec();
  } catch (e) {
    throw Error("Error finding post.");
  }
  if (!post) {
    throw Error("Post not found.");
  }

  if (!post.authorId.equals(requestor._id)) {
    throw Error("Not authorized.");
  }

  await models.models.Post.deleteOne({ _id: post._id });
  await models.models.Likes.deleteMany({ postId });
  return true;
}

export { deletePost };
