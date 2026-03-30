import mongoose from "mongoose";
const schema = mongoose.Schema;

let chatSchema = new schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

let Chat = mongoose.model("Chat", chatSchema);

export default Chat;
