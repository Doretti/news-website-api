import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    text: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

export type newsType = {
  title: String;
  text: String;
  authorId: mongoose.Schema.Types.ObjectId;
  _id: String;
  __v: Number;
  createdAt: String;
  updatedAt: String;
};

const News = mongoose.model("news", NewsSchema);

export default News;
