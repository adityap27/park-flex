import mongoose from "mongoose";

export const getConnection = async () => {
  return await mongoose.connect(
    "mongodb+srv://group_user:Cy3H6QjOnrZ8XGYu@webgroupproject.dhqv6jf.mongodb.net/?retryWrites=true&w=majority&appName=WebGroupProject"
  );
};
