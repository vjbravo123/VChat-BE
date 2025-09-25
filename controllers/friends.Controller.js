import Conversation from "../models/Conversation.js";
import User from "../models/Users.js";

export const getFriendsListByUserId = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("friends", "username");
    res.json({ friends: user.friends || [] });
}

export const deleteFriend = async (req, res) => {
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
}


export const searchUsers = async (req, res) => {
    const { username, currentUserId } = req.query;
    if (!username) return res.status(400).json({ message: "Username query is required" });

    const users = await User.find(
        { username: new RegExp(username, "i"), _id: { $ne: currentUserId } },
        { username: 1 }
    );
    res.json({ users });
}


export const addFriend = async (req, res) => {
    const { userId, friendId } = req.body;
    if (!userId || !friendId) return res.status(400).json({ message: "User ID and Friend ID are required" });

    // Add each other as friends if not already added
    await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $addToSet: { friends: userId } });

    res.json({ message: "Friend added successfully" });
}