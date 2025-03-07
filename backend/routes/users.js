const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const requireAuth = require("../middleware/requireAuth");

const {
  loginUser,
  signupUser,
  getAllUsers,
  getUserById,
  deleteUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/", requireAuth, getAllUsers);

router.get("/:id", requireAuth, getUserById);

router.delete("/:id", requireAuth, deleteUserProfile);

router.put("/:id", requireAuth, updateUserProfile);

module.exports = router;
