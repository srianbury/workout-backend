import { gql } from "apollo-server-express";

const userSchema = gql`
  extend type Query {
    getUserByUsername(username: String!): User
    getMyFavorites: [FavoritedPost!]!
  }

  extend type Mutation {
    authenticate(token: String!, method: String!): AuthenticatedUser
    updateUserInfo(token: String!, userInfo: UserInfo!): UpdateUserInfoResponse!
  }

  type User {
    userId: ID!
    email: String!
    initials: String!
    username: String!
    picture: String
  }

  type AuthenticatedUser {
    userId: ID!
    email: String!
    initials: String!
    username: String!
    picture: String
    token: String!
  }

  input UserInfo {
    username: String
  }

  type UpdateUserInfoResponse {
    success: Boolean!
    message: String
    user: UpdateUserResponse
  }

  type UpdateUserResponse {
    accessToken: String
  }

  type FavoritedPost {
    favoritedAt: DateTime!
    post: Post!
  }
`;

export { userSchema };
