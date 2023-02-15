import { getUserByUsername } from "./getUserByUsername";
import { getUsersInitials } from "./getUsersInitials";
import { authenticate } from "./authenticate";
import { updateUserInfo } from "./updateUserInfo";

const userResolver = {
  Query: {
    getUserByUsername,
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
