const express = require("express");
const router = express.Router();

const {
  addEmoji,
  getAllEmoji,
  updateEmoji,
  deleteEmoji,
  getEmojiById,
  searchEmoji,
} = require("../controllers/emojiController");

router.post("/", addEmoji);
router.get("/", getAllEmoji);
router.put("/:id", updateEmoji);
router.delete("/:id", deleteEmoji);
router.get("/search/:emoji", searchEmoji); 
router.get("/:id", getEmojiById);


module.exports = router;
