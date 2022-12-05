import { getAuth } from "firebase-admin/auth";

async function deletePost(
  parent,
  { token, postId },
  { models, firebaseApp },
  info
) {
  let auth;
  try {
    auth = await getAuth(firebaseApp).verifyIdToken(token);
  } catch (e) {
    throw Error("Not authorized.");
  }
  if (!auth) {
    throw Error("Not authorized.");
  }

  const user = await models.models.User.findOne({ userId: auth.uid }).exec();
  if (!user) {
    throw Error("Not authorized.");
  }

  let post;
  try {
    post = await models.models.Post.findById(postId).exec();
  } catch (e) {
    throw Error("Post not found.");
  }
  if (!post) {
    throw Error("Post not found.");
  }

  if (post.userId != auth.uid) {
    throw Error("Not authorized.");
  }

  await models.models.Post.deleteOne({ _id: post._id });
  return true;
}

export { deletePost };
