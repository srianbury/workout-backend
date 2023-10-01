import { getUserByUsername } from "./getUserByUsername";
import { getUsersInitials } from "./getUsersInitials";
import { authenticate } from "./authenticate";
import { updateUserInfo } from "./updateUserInfo";
import { getMyFavorites } from "./getMyFavorites";

const userResolver = {
  Query: {
    getUserByUsername,
    getMyFavorites,
  },
  Mutation: {
    authenticate,
    updateUserInfo,
  },
  User: {
    initials: getUsersInitials,
  },
  AuthenticatedUser: {
    initials: getUsersInitials,
  },
};

export { userResolver };
