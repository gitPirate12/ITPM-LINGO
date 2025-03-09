const Emoji = require("../models/emojiModel");
const mongoose = require("mongoose");

// Create a new emoji if it doesn't already exist
const addEmoji = async (req, res) => {
  const { emoji, meaningEng, meaningSin } = req.body;

  try {
    // Check if emoji already exists
    const existingEmoji = await Emoji.findOne({ emoji });
    if (existingEmoji) {
      return res
        .status(400)
        .json({ status: "Error", error: "Emoji already exists" });
    }

    const newEmoji = new Emoji({
      emoji,
      meaningEng,
      meaningSin,
    });

    await newEmoji.save();
    res.status(200).json("Emoji added successfully");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "Error adding emoji", error: error.message });
  }
};

// Retrieve all emojis
const getAllEmoji = async (req, res) => {
  Emoji.find()
    .then((emojis) => {
      res.status(200).json(emojis);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ status: "Error getting emojis", error: error.message });
    });
};

// Update an existing emoji by its ID
const updateEmoji = async (req, res) => {
  const { emoji, meaningEng, meaningSin } = req.body;
  const emojiId = req.params.id;

  try {
    const updatedEmoji = await Emoji.findByIdAndUpdate(
      emojiId,
      { emoji, meaningEng, meaningSin },
      { new: true }
    );
    res.status(200).json(updatedEmoji);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "Error updating emoji", error: error.message });
  }
};

// Delete an emoji by its ID
const deleteEmoji = async (req, res) => {
  const emojiId = req.params.id;

  try {
    const deletedEmoji = await Emoji.findByIdAndDelete(emojiId);
    if (deletedEmoji) {
      res.status(200).json({ status: "Emoji deleted successfully" });
    } else {
      res.status(404).json({ status: "Emoji not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "Error deleting emoji", error: error.message });
  }
};

// Get an emoji by its ID
const getEmojiById = async (req, res) => {
  const emojiId = req.params.id;

  try {
    const emoji = await Emoji.findById(emojiId);
    if (emoji) {
      res.status(200).json(emoji);
    } else {
      res.status(404).json({ status: "Emoji not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "Error getting emoji", error: error.message });
  }
};

// Search for an emoji by its symbol
const searchEmoji = async (req, res) => {
  const enteredEmoji = req.params.emoji;

  try {
    const emoji = await Emoji.findOne({ emoji: enteredEmoji });
    if (emoji) {
      res.status(200).json({
        status: "Emoji found",
        meaningEng: emoji.meaningEng,
        meaningSin: emoji.meaningSin,
      });
    } else {
      res.status(404).json({ status: "Emoji not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "Error searching emoji", error: error.message });
  }
};

module.exports = {
  addEmoji,
  getAllEmoji,
  updateEmoji,
  deleteEmoji,
  getEmojiById,
  searchEmoji,
};
