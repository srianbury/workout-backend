async function getPostByPostId(parent, { postId }, { models }, info) {
  try {
    const post = await models.models.Post.findById(postId).exec();
    if (!post) {
      return null;
    }
    return post;
  } catch (e) {
    return null;
  }
}

export { getPostByPostId };
