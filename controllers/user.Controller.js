import User from "../models/Users.js";
import bcrypt from 'bcrypt';
export const signupHandler = async (req, res) => {

    const { username, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.json({ message: "User with this email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, friends: [] });
    res.status(201).json({ userAdded: true, username: user.username });

}

export const loginHandler = async (req, res) => {
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

}