import mongoose from "mongoose";

/*
  Collection to stored the posts favorited by a user
*/
const userFavoritesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favorites: {
      type: Map,
      of: {
        favoritedAt: {
          type: Date,
          default: Date.now,
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);

const UserFavorites =
  mongoose.models.UserFavorites ||
  mongoose.model("UserFavorites", userFavoritesSchema);

export { UserFavorites };
