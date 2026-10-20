import { getUserByUsername } from "./getUserByUsername";
import { getUsersInitials } from "./getUsersInitials";
import { authenticate } from "./authenticate";
import { updateUserInfo } from "./updateUserInfo";
import { getMyFavorites } from "./getMyFavorites";
import { followUser } from "./followUser";
import { unfollowUser } from "./unfollowUser";
import { getIsFollowing } from "./getIsFollowing";

const userResolver = {
  Query: {
    getUserByUsername,
    getMyFavorites,
  },
  Mutation: {
    authenticate,
    updateUserInfo,
    followUser,
    unfollowUser,
  },
  User: {
    id: (user) => user._id.toString(),
    initials: getUsersInitials,
    following: getIsFollowing,
  },
  AuthenticatedUser: {
    id: (user) => user._id.toString(),
    initials: getUsersInitials,
  },
};

export { userResolver };
