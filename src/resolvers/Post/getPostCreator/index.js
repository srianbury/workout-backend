async function getPostCreator(post, args, { models, loaders }, info) {
  return await loaders.creators.load(post.userId);
}

export { getPostCreator };
