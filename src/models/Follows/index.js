import mongoose from "mongoose";

const followsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followingUserId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

followsSchema.index({ followingUserId: 1, userId: 1 }, { unique: true });
followsSchema.index({ userId: 1 });
followsSchema.index({ followingUserId: 1 });

const Follows =
  mongoose.models.Follows || mongoose.model("Follows", followsSchema);

export { Follows };

/*
Example:

{
  _id: ObjectId("6acc5fc35c3c9e1b2370c688"),
  userId: ObjectId("6ac72220eabd3e4070a4ff27"),
  followingUserId: ObjectId("630d68d435f47dfc068f1343"),
  createdAt: ISODate("2026-10-12T04:19:15.058Z"),
  updatedAt: ISODate("2026-10-12T04:19:15.058Z"),
  __v: 0
}

*/
