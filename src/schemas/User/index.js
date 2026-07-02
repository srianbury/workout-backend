import { gql } from "apollo-server-express";

const userSchema = gql`
  extend type Query {
    getUserByUsername(username: String!): User
    getMyFavorites: [FavoritedPost!]!
  }

  extend type Mutation {
    authenticate(method: String!): AuthenticatedUser
    updateUserInfo(userInfo: UserInfo!): UpdateUserInfoResponse!
  }

  type User {
    id: ID!
    email: String!
    initials: String!
    username: String!
    picture: String
  }

  type AuthenticatedUser {
    id: ID!
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
