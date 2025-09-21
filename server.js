import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import User from "./models/Users.js";
import bcrypt from "bcrypt";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import Message from "./models/Message.js";
import Conversation from "./models/Conversation.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://v-chat-fe.vercel.app",
    methods: ["GET", "POST"],
  },
});

connectdb(process.env.MONGO_URI);




io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join room
  socket.on("join_room", async ({ roomId }) => {
    try {
      socket.join(roomId);

      // fetch old messages from DB
      const messages = await Message.find({ conversationId: roomId })
        .populate("senderId", "username profilePic")
        .sort({ createdAt: 1 }); // oldest → newest

      socket.emit("load_messages", messages);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  });

  // leave room
  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
  });

  // send message
  socket.on("send_message", async (data) => {
    try {
      const { room, senderId, text } = data;

      // create message in DB
      const newMessage = new Message({
        conversationId: room,
        senderId,
        text,
      });
      await newMessage.save();

      // update lastMessage in conversation
      await Conversation.findByIdAndUpdate(room, {
        lastMessage: newMessage._id,
      });

      // populate sender details for frontend
      const populatedMsg = await newMessage.populate("senderId", "username profilePic");

      // broadcast to all users in the room
      io.to(room).emit("receive_message", populatedMsg);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  // disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// server.js (Express)
app.delete("/friend-remove", async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    // 1. Remove friend from both users
    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

    // 2. Delete their conversation
    await Conversation.findOneAndDelete({
      participants: { $all: [userId, friendId] }
    });

    res.json({ message: "Friend removed and conversation deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.post("/conversations", async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, friendId] },
      type: "direct",
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [userId, friendId],
      });
      await conversation.save();
    }

    res.json(conversation);
  } catch (err) {
    console.error("Error creating/fetching conversation:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.json({ message: "User with this email already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash, friends: [] });
  res.status(201).json({ userAdded: true, username: user.username });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.json({ message: "User not found", validUser: false });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.json({ message: "Wrong Credentials", validUser: false });

  res.json({
    message: "Login Successful",
    validUser: true,
    user: { id: user._id, username: user.username, email: user.email, profilePic: user.profilePic || null }
  });
});

// Search users (exclude current user)
app.get("/search", async (req, res) => {
  const { username, currentUserId } = req.query;
  if (!username) return res.status(400).json({ message: "Username query is required" });

  const users = await User.find(
    { username: new RegExp(username, "i"), _id: { $ne: currentUserId } },
    { username: 1 }
  );
  res.json({ users });
});

// Add friend directly
app.post("/friend-add", async (req, res) => {
  const { userId, friendId } = req.body;
  if (!userId || !friendId) return res.status(400).json({ message: "User ID and Friend ID are required" });

  // Add each other as friends if not already added
  await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } });
  await User.findByIdAndUpdate(friendId, { $addToSet: { friends: userId } });

  res.json({ message: "Friend added successfully" });
});

// Remove friend
app.post("/friend-remove", async (req, res) => {
  const { userId, friendId } = req.body;
  if (!userId || !friendId) return res.status(400).json({ message: "User ID and Friend ID are required" });

  await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
  await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

  res.json({ message: "Friend removed successfully" });
});

// Get friends list
app.get("/friends/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("friends", "username");
  res.json({ friends: user.friends || [] });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
