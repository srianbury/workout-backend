async function getPostCreator(post, args, { models, loaders }, info) {
  return await loaders.creators.load(post.authorId);
}

export { getPostCreator };
