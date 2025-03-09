const Reply = require("../models/replyModel");
const mongoose = require("mongoose");
const Post = require("../models/postModel");

/**
 * Get all replies sorted by creation date (newest first),
 * and populate each reply's nested replies with the author (only userName).
 */
const getReplies = async (req, res) => {
  try {
    // Fetch all replies and sort by createdAt descending
    let replies = await Reply.find({}).sort({ createdAt: -1 });
    
    // For each reply, populate its nested replies and the author field of those replies
    replies = await Promise.all(
      replies.map(async (reply) =>
        await reply.populate({
          path: "replies",
          select: "comment author",
          populate: {
            path: "author",
            select: "userName",
          },
        })
      )
    );
    
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Get a single reply by its ID and populate its nested replies with the author (userName).
 */
const getReply = async (req, res) => {
  const { id } = req.params;

  // Validate reply ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reply" });
  }

  // Find reply and populate nested replies
  let reply = await Reply.findById(id).populate({
    path: "replies",
    select: "comment author",
    populate: {
      path: "author",
      select: "userName",
    },
  });

  if (!reply) {
    return res.status(404).json({ error: "No such reply" });
  }

  res.status(200).json(reply);
};

/**
 * Helper: Update a parent reply by adding a new reply's ID to its replies array.
 * Throws an error if the parent reply isn't found.
 */
async function updateParentReply(parentReplyId, replyId) {
  const parentReply = await Reply.findById(parentReplyId);
  if (!parentReply) {
    throw new Error("Parent reply not found");
  }
  parentReply.replies.push(replyId);
  await parentReply.save();
}

/**
 * Helper: Update a parent post by adding a new reply's ID to its replies array.
 * Throws an error if the parent post isn't found.
 */
async function updateParentPost(postId, replyId) {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Parent post not found");
  }
  post.replies.push(replyId);
  await post.save();
}

/**
 * Create a new reply. Optionally links the reply to a parent reply and/or a parent post.
 */
const createReply = async (req, res) => {
  const author = req.user._id;
  const { comment, parentid, parentReplyId } = req.body;

  try {
    // Create the reply document
    const reply = await Reply.create({
      author,
      comment,
      parentid,
      parentReplyId,
    });
    const replyId = reply._id;

    // If provided, update the parent reply's replies array
    if (parentReplyId) {
      await updateParentReply(parentReplyId, replyId);
    }

    // If provided, update the parent post's replies array
    if (parentid) {
      await updateParentPost(parentid, replyId);
    }

    res.status(201).json(reply);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a reply by its ID.
 */
const deleteReply = async (req, res) => {
  const { id } = req.params;

  // Validate reply ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reply" });
  }

  const reply = await Reply.findOneAndDelete({ _id: id });
  if (!reply) {
    return res.status(404).json({ error: "No such reply" });
  }

  res.status(200).json(reply);
};

/**
 * Update a reply by its ID with new data.
 */
const updateReply = async (req, res) => {
  const { id } = req.params;

  // Validate reply ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reply" });
  }

  const reply = await Reply.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!reply) {
    return res.status(404).json({ error: "No such reply" });
  }

  res.status(200).json(reply);
};

/**
 * Toggle a user's vote on a reply: add the vote if not present, remove if already present.
 */
const toggleVoteCount = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Validate reply ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such reply" });
    }

    const reply = await Reply.findById(id);
    if (!reply) {
      return res.status(404).json({ error: "No such reply" });
    }

    // Toggle vote: remove if already voted, otherwise add the vote
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

/**
 * Get all replies for a given post ID and populate the nested replies with author details.
 */
const getRepliesByPostId = async (req, res) => {
  const { postId } = req.params;

  // Validate post ID format
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ error: "Invalid post ID" });
  }

  try {
    const post = await Post.findById(postId).populate({
      path: "replies",
      select: "comment author",
      populate: {
        path: "author",
        select: "userName",
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
