const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getReplies,
  getReply,
  createReply,
  deleteReply,
  toggleVoteCount,
  getRepliesByPostId,
  updateReply,
} = require("../controllers/replyController");

const router = express.Router();


router.get("/", getReplies);


router.get("/post/:postId", getRepliesByPostId);


router.get("/:id", getReply);


router.post("/", requireAuth, createReply);
router.delete("/:id", requireAuth, deleteReply);
router.patch("/:id/upvote", requireAuth, toggleVoteCount);
router.patch("/:id", requireAuth, updateReply);

module.exports = router;
