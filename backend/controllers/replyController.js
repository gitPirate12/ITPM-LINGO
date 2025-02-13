const Reply = require("../models/replyModel");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const Thread = require("../models/threadModel");

const getRepliesByThread = async (req, res) => {
  const { threadId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(threadId)) {
      return res.status(404).json({ error: "Invalid thread ID" });
    }

    const thread = await Thread.findById(threadId).populate({
      path: "replies",
      populate: {
        path: "author",
        model: "User",
      },
    });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json(thread.replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
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

const createReply = async (req, res) => {
  const author = req.user._id;

  const { content, parentid, parentReplyId } = req.body;

  try {
    const reply = await Reply.create({
      author,
      content,
      parentid,
      parentReplyId,
    });

    const replyId = reply._id;

    if (parentReplyId) {
      const parentReply = await Reply.findById(parentReplyId);
      if (!parentReply) {
        return res.status(404).json({ error: "Parent reply not found" });
      }
      parentReply.replies.push(replyId);
      await parentReply.save();
    }

    if (parentid) {
      const thread = await Thread.findById(parentid);
      if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
      }
      thread.replies.push(replyId);
      await thread.save();
    }

    res.status(200).json(reply);
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

const toggleLike = async (req, res) => {
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
    const likeIndex = reply.likes.indexOf(userId);

    if (likeIndex === -1) {
      reply.likes.push(userId);
    } else {
      reply.likes.splice(likeIndex, 1);
    }
    await reply.save();

    res.status(200).json({
      likes: reply.likes.length,
      likedByUser: likeIndex === -1,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRepliesByThread,
  getReply,
  createReply,
  deleteReply,
  updateReply,
  toggleLike,
};
