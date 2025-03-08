const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getposts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  toggleVoteCount,
} = require("../controllers/postController");

router.get("/", getposts);

router.get("/:id", getPost);

router.post("/", requireAuth, createPost);

router.delete("/:id", requireAuth, deletePost);

router.patch("/:id", requireAuth, updatePost);

router.patch("/:id/toggleVoteCount", requireAuth, toggleVoteCount);

module.exports = router;
