const Thread = require("../models/threadModel");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");

const getThreads = async (req, res) => {
  try {
    const threads = await Thread.find({})
    .populate("author", "firstName lastName userName")
    .populate({
      path: "replies",
      select: "author content likes replies parentReplyId",
      populate: {
        path: "author",
        select: "firstName lastName", 
      },
    })
    .sort({ createdAt: -1 });
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getThread = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such thread" });
  }
  const thread = await Thread.findById(id);

  if (!thread) {
    return res.status(404).json({ error: "No such thread" });
  }

  res.status(200).json(thread);
};

const createThread = async (req, res) => {
  const {  body, tags } = req.body;
  const author = req.user._id;

  try {
    const thread = await Thread.create({ body, author, tags });
    res.status(200).json(thread);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteThread = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such thread" });
  }
  const thread = await Thread.findOneAndDelete({ _id: id });
  if (!thread) {
    return res.status(404).json({ error: "No such thread" });
  }
  res.status(200).json(thread);
};

const updateThread = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such thread" });
  }

  const thread = await Thread.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!thread) {
    return res.status(404).json({ error: "No such thread" });
  }

  res.status(200).json(thread);
};

const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such thread" });
    }
    const thread = await Thread.findById(id);
    if (!thread) {
      return res.status(404).json({ error: "No such thread" });
    }
    const likeIndex = thread.likes.indexOf(userId);

    if (likeIndex === -1) {
      thread.likes.push(userId);
    } else {
      thread.likes.splice(likeIndex, 1);
    }
    await thread.save();

    res.status(200).json({
      likes: thread.likes.length,
      likedByUser: likeIndex === -1,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    getThreads,
    getThread,
    createThread,
    deleteThread,
    updateThread,
    toggleLike,
};
