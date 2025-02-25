const Emoji = require("../models/Emoji");

const createEmoji = async (req, res) => {
  const { emoji, meaningEng, meaningSin } = req.body;

  try {
    const existingEmoji = await Emoji.findOne({ emoji });
    if (existingEmoji) {
      return res.status(400).json({ status: "Error", error: "Emoji already exists" });
    }

    const newEmoji = new Emoji({ emoji, meaningEng, meaningSin });

    await newEmoji.save();
    res.json("Emoji added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error adding emoji", error: error.message });
  }
};

const getEmojies = async (req, res) => {
  Emoji.find()
    .then((emojis) => {
      res.json(emojis);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "Error getting emojis", error: error.message });
    });
};

const updateEmoji = async (req, res) => {  
  const { emoji, meaningEng, meaningSin } = req.body;
  const emojiId = req.params.id;

  try {
    const updatedEmoji = await Emoji.findByIdAndUpdate(
      emojiId,
      { emoji, meaningEng, meaningSin },
      { new: true }
    );
    res.json(updatedEmoji);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error updating emoji", error: error.message });
  }
};

const deleteEmoji = async (req, res) => {
  const emojiId = req.params.id;

  try {
    const deletedEmoji = await Emoji.findByIdAndDelete(emojiId);
    if (deletedEmoji) {
      res.json({ status: "Emoji deleted successfully" });
    } else {
      res.status(404).json({ status: "Emoji not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error deleting emoji", error: error.message });
  }
};

const getEmojiById = async (req, res) => {
  const emojiId = req.params.id;

  try {
    const emoji = await Emoji.findById(emojiId);
    if (emoji) {
      res.json(emoji);
    } else {
      res.status(404).json({ status: "Emoji not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error getting emoji", error: error.message });
  }
};

const searchEmoji = async (req, res) => {
  const enteredEmoji = req.params.emoji;

  try {
    const emoji = await Emoji.findOne({ emoji: enteredEmoji });
    if (emoji) {
      res.json({
        status: "Emoji found",
        meaningEng: emoji.meaningEng,
        meaningSin: emoji.meaningSin,
      });
    } else {
      res.status(404).json({ status: "Emoji not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error searching emoji", error: error.message });
  }
};

module.exports = {
  createEmoji,
  getEmojies,
  updateEmoji,
  deleteEmoji,
  getEmojiById,
  searchEmoji,
};
