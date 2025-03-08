const Reply = require("../models/replyModel");
const mongoose = require("mongoose");
const Post = require("../models/postModel");

const getReplies = async (req, res) => {
  try {
    const replies = await Reply.find({}).sort({ createdAt: -1 });
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReply = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reply" });
  }
  const reply = await Reply.findById(id);

  if (!reply) {
    return res.status(404).json({ error: "No such reply" });
  }

  res.status(200).json(reply);
};

//helper funtion to the create reply controller
async function updateParentReply(parentReplyId, replyId) {
  const parentReply = await Reply.findById(parentReplyId);
  if (!parentReply) {
    throw new Error("Parent reply not found");
  }
  parentReply.replies.push(replyId);
  await parentReply.save();
}

//helper funtion to the create reply controller
async function updateParentPost(postId, replyId) {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Parent post not found");
  }
  post.replies.push(replyId);
  await post.save();
}

const createReply = async (req, res) => {
  const author = req.user._id;
  const { comment, parentid, parentReplyId } = req.body;

  try {
    const reply = await Reply.create({
      author,
      comment,
      parentid,
      parentReplyId,
    });

    const replyId = reply._id;

    if (parentReplyId) {
      await updateParentReply(parentReplyId, replyId);
    }

    if (parentid) {
      await updateParentPost(parentid, replyId);
    }

    res.status(201).json(reply);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteReply = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reply" });
  }

  const reply = await Reply.findOneAndDelete({ _id: id });

  if (!reply) {
    return res.status(404).json({ error: "No such reply" });
  }

  res.status(200).json(reply);
};

const updateReply = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reply" });
  }

  const reply = await Reply.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!reply) {
    return res.status(404).json({ error: "No such reply" });
  }

  res.status(200).json(reply);
};

const toggleVoteCount = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such reply" });
    }

    const reply = await Reply.findById(id);

    if (!reply) {
      return res.status(404).json({ error: "No such reply" });
    }

    if (reply.votes.includes(userId)) {
      const index = reply.votes.indexOf(userId);
      reply.votes.splice(index, 1);
    } else {
      reply.votes.push(userId);
    }

    await reply.save();

    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRepliesByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ error: "Invalid post ID" });
    }

    const post = await Post.findById(postId).populate({
      path: "replies",
      populate: {
        path: "author",
        model: "User",
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post.replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getReplies,
  getReply,
  createReply,
  deleteReply,
  updateReply,
  toggleVoteCount,
  getRepliesByPostId,
};
