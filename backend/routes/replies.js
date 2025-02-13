const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getRepliesByThread,
  getReply,
  createReply,
  deleteReply,
  updateReply,
  toggleLike,
} = require("../controllers/replyController");

const router = express.Router();

router.get("/threads/:threadId/replies", getRepliesByThread);

router.get("/:id", getReply);

router.post("/", requireAuth, createReply);

router.delete("/:id", requireAuth, deleteReply);

router.patch("/:id", requireAuth, updateReply);

router.patch("/:id/like", requireAuth, toggleLike);

module.exports = router;
