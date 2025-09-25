import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const chatSocket = (io) => {
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
}

export default chatSocket;