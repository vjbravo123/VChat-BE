import Conversation from "../models/Conversation.js";

export const get_Or_Create_Conversation = async (req , res )=>{
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
}