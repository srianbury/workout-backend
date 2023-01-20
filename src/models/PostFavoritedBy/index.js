import mongoose from "mongoose";

/*
  Collection to stored who favorited a post
*/
const postFavoritedBySchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    favoritedBy: {
      type: Map,
      of: {
        favoritedAt: {
          type: Date,
          default: Date.now,
          required: true,
        },
      },
    },
    favorites: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PostFavoritedBy =
  mongoose.models.PostFavoritedBy ||
  mongoose.model("PostFavoritedBy", postFavoritedBySchema);

export { PostFavoritedBy };
