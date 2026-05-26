import mongoose from "mongoose";

const likesSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

likesSchema.index({ userId: 1, postId: 1 }, { unique: true });
likesSchema.index({ postId: 1 });
likesSchema.index({ userId: 1 });

const Likes = mongoose.models.Likes || mongoose.model("Likes", likesSchema);

export { Likes };

/*
Example:

{
  _id: ObjectId("682935eb29e7421840d6012a"),
  postId: ObjectId("6382608c4e99402b3352ead2"),
  userId: ObjectId("630d68d435f47dfc068f1343"),
  createdAt: ISODate("2025-05-18T01:20:43.683Z"),
  updatedAt: ISODate("2025-05-18T01:20:43.683Z"),
  __v: 0
}

*/
