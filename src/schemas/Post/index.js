import { gql } from "apollo-server-express";

const postSchema = gql`
  extend type Query {
    getPosts: [Post!]!
    getPostByPostId(postId: ID!): Post
    getPostsByUsername(username: String!): [Post!]
  }

  extend type Mutation {
    createPost(
      title: String!
      shortDescription: String!
      longDescription: String!
      videoSource: String
    ): Post
    updatePost(
      postId: ID!
      title: String
      shortDescription: String
      longDescription: String
      videoSource: String
    ): Post!
    deletePost(postId: ID!): Boolean
    favoritePost(postId: ID!, operation: String!): Boolean!
  }

  type Post {
    postId: ID!
    title: String!
    shortDescription: String!
    longDescription: String!
    videoSource: String
    createdAt: DateTime!
    media: PostMedia
    user: User!
    favorites: Int!
    favorited: Boolean!
  }

  type PostMedia {
    video: PostMediaVideo
    photo: String
  }

  type PostMediaVideo {
    source: String
    id: String
  }
`;

export { postSchema };
