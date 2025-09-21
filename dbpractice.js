import connectdb from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/Users.js";

dotenv.config();

connectdb(process.env.MONGO_URI);
let uid = '68ccedbc54a420968dd642fc';
async function getfriends(uid){
    const data = await User.findById(uid).populate("friends","email");
    console.log(data.friends);
    
}

getfriends(uid)