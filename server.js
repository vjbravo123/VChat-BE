import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import friendRouter from "./routes/friends.route.js";
import conversationRouter from "./routes/conversation.route.js";
import ChatSocket from "./sockets/Chat.socket.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

connectdb(process.env.MONGO_URI);

ChatSocket(io);

// For user related routes
app.use("/api/user", userRouter );


// For Friends related routes
app.use('/api/friend' , friendRouter);

// For Conversation related routes
app.use('/api/conversation' , conversationRouter)



server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
