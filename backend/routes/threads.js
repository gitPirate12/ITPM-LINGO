const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getThreads,
  getThread,
  createThread,
  deleteThread,
  updateThread,
  toggleLike,
} = require("../controllers/threadController");

router.get("/", getThreads);

router.get("/:id", getThread);

router.post("/", requireAuth, createThread);

router.delete("/:id", requireAuth, deleteThread);

router.patch("/:id", requireAuth, updateThread);

router.patch("/:id/like", requireAuth, toggleLike);

module.exports = router;
