const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    parentid: {
      type: Schema.Types.ObjectId,
      ref: "Thread",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    parentReplyId: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
      default: null,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
