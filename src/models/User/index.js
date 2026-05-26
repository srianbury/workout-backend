import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      // the uid provided by firebase auth
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    picture: String,
  },
  { timestamps: true },
);

userSchema.index({ userId: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };

/*
Examples:

[
  {
    _id: ObjectId("630d68d435f47dfc068f1343"),
    userId: 'PCXwV8I0kUS7nqWNuivVybAcaHN2',
    username: 'brian',
    email: 'bsunbury29@gmail.com',
    picture: 'https://graph.facebook.com/2119280251792980/picture',
    createdAt: ISODate("2022-08-30T01:33:08.237Z"),
    updatedAt: ISODate("2022-09-01T15:27:21.254Z"),
    __v: 0
  }
]

*/
