const express = require("express");

const {
  createEmoji,
  getEmojies,
  updateEmoji,
  deleteEmoji,
  getEmojiById,
  searchEmoji,
} = require("../controllers/emojiController");

const router = express.Router();

router.post("/add", createEmoji);

router.get("/", getEmojies);

router.put("/update/:id", updateEmoji);

router.delete("/delete/:id", deleteEmoji);

router.get("/get/:id", getEmojiById);

router.get("/search/:emoji", searchEmoji);

module.exports = router;
