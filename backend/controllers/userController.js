const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Create a JWT for a given user ID.
 * The token expires in 3 days.
 */
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

/**
 * Login a user.
 * Validates email and password, then returns a JWT if successful.
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Incorrect email" });
    }

    // Compare provided password with hashed password in DB
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate a token for the user
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Signup a new user.
 * Checks if the email is already in use, hashes the password, creates a user, and returns a token.
 */
const signupUser = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    // Check if a user with the same email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create the user document in the database
    const user = await User.create({
      email,
      password: hash,
      userName,
    });

    // Generate a token for the new user
    const token = createToken(user._id);

    // Note: Avoid sending the password back in the response for security reasons
    res.status(200).json({ email, token, userName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a user profile by ID.
 */
const deleteUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ msg: "User profile deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

/**
 * Update a user's profile.
 * Allows updating of userName and email.
 */
const updateUserProfile = async (req, res) => {
  try {
    const { userName, email } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields if provided
    if (userName) user.userName = userName;
    if (email) user.email = email;

    await user.save();

    res.json({ msg: "User profile updated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

/**
 * Get all users.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

/**
 * Get a single user by ID.
 */
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  loginUser,
  signupUser,
  getAllUsers,
  getUserById,
  deleteUserProfile,
  updateUserProfile,
};
