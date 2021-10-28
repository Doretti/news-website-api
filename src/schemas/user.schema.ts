import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type userType = {
  username: String;
  password: String;
  _id: String;
  __v: Number;
  createdAt: String;
  updatedAt: String;
};

const User = mongoose.model("users", UserSchema);

export default User;
