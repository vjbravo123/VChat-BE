import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["direct", "group"], default: "direct" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groupName: { type: String, default: null },
    groupIcon: { type: String, default: null },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;
