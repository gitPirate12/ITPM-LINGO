const Post = require("../models/postModel");
const mongoose = require("mongoose");

// Get all posts, sorted by newest first, with the author's userName populated
const getposts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 }).populate({
      path: "author",
      select: "userName",
    })
    .populate({
      path: 'replies', // Populates the replies
      populate: {
        path: 'author', // Also populate the author inside each reply
        select: 'userName',
      },
    })

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single post by ID and populate the author field with userName
const getPost = async (req, res) => {
  const { id } = req.params;

  // Validate post ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  let post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }
  // Populate the author field with userName
  post = await post.populate({
    path: "author",
    select: "userName",
  });

  res.status(200).json(post);
};

// Create a new post and populate the author field with userName
const createPost = async (req, res) => {
  const { question, description, tags } = req.body;
  const author = req.user._id;

  try {
    let post = await Post.create({ question, description, author, tags });
    // Populate the author field for the created post
    post = await post.populate({
      path: "author",
      select: "userName",
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a post by its ID
const deletePost = async (req, res) => {
  const { id } = req.params;
  // Validate post ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findOneAndDelete({ _id: id });

  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

// Update a post by its ID with the provided data
const updatePost = async (req, res) => {
  const { id } = req.params;
  // Validate post ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

// Toggle a user's vote on a post (add if not voted, remove if already voted)
const toggleVoteCount = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    // Validate post ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such post" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "No such post" });
    }
    // Toggle vote: remove vote if user already voted, otherwise add the vote
    if (post.votes.includes(userId)) {
      const index = post.votes.indexOf(userId);
      post.votes.splice(index, 1);
    } else {
      post.votes.push(userId);
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getposts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  toggleVoteCount,
};
