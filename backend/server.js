const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const PostRoutes = require("./routes/posts");
const ReplyRoutes = require("./routes/replies");
const userRoutes = require("./routes/users");
const emojiRouter = require("./routes/emoji");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/posts", PostRoutes);
app.use("/api/replies", ReplyRoutes);
app.use("/api/users", userRoutes);
app.use("/emoji", emojiRouter);


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB Connection Success! ✅");

    const PORT = process.env.PORT || 3040;
    app.listen(PORT, () => {
      console.log(`🚀 Server is up and running on port number : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
