const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    parentid: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
    parentReplyId: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
