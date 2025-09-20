import mongoose from "mongoose";

const connectdb =async (uri) =>{
   try {
    const conn = await mongoose.connect(uri);
    console.log("mongodb connected :" , conn.connection.host); 
    return conn;
   } catch (error) {
    console.error("Error :" , error)
   }
}

export default connectdb;